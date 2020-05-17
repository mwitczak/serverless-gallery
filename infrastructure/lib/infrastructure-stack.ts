import * as cdk from '@aws-cdk/core';
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import { ViewerCertificate } from "@aws-cdk/aws-cloudfront";
import * as route53 from "@aws-cdk/aws-route53";
import { HostedZone, RecordTarget } from "@aws-cdk/aws-route53";
import { CloudFrontTarget } from "@aws-cdk/aws-route53-targets";
import * as acm from "@aws-cdk/aws-certificatemanager";
import { ValidationMethod } from "@aws-cdk/aws-certificatemanager";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //S3 Bucket for frontend resources
    const websiteBucket = new s3.Bucket(this, "serverless-gallery-bucket", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true
    });

    //already existing HostedZone (Route53)
    const zone = HostedZone.fromHostedZoneAttributes(this, "serverless-gallery-zone", {
      zoneName: "aws.martinwitczak.com",
      hostedZoneId: "ZBW8TUSQQ5STF"
    });

    //create SSL certificate for the frontend
    const cert = new acm.DnsValidatedCertificate(this, "serverless-gallery-cert", {
      domainName: "gallery.aws.martinwitczak.com",
      validationMethod: ValidationMethod.DNS,
      hostedZone: zone,
      region: "us-east-1"
    });

    //create cloudfront distribution (CDN) for s3 bucket
    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "serverless-gallery-distribution",
      {
        viewerCertificate: ViewerCertificate.fromAcmCertificate(cert, {
          aliases: ["gallery.aws.martinwitczak.com"]
        }),
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: websiteBucket
            },
            behaviors: [{ isDefaultBehavior: true }]
          }
        ],
        //this allows frontend routing, if cloudfront doesnt find a resource it return index.html with status 200
        errorConfigurations: [
          {
            errorCode: 403,
            responseCode: 200,
            responsePagePath: "/index.html"
          }
        ]
      }
    );

    //deploy precompiled frontend resources to S3
    const websiteDeployment = new s3deploy.BucketDeployment(
      this,
      "serverless-gallery-deployment",
      {
        sources: [s3deploy.Source.asset("../frontend-next/out")],
        destinationBucket: websiteBucket,
        distribution
      }
    );

    //create Route53 entry to serve cloudfront under frontend domain
    new route53.ARecord(this, "serverless-gallery-dns-alias", {
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone: zone,
      recordName: "gallery.aws.martinwitczak.com"
    });
  }
}
