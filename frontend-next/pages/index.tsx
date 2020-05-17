import Head from 'next/head'
import ProgressiveImage from 'react-progressive-image';
import galleries from '../public/galleries/categories.json';

const photoBox = (src, country, place, link) => (
  <div className={'photo'} onClick={() => {}}>
    <ProgressiveImage src={src.replace(':height', '750')} placeholder={src.replace(':height', '25')}>
      {(src) => (
        <img src={src} />
      )}
    </ProgressiveImage>
    <div className={'location'}>
      <span className={'country'}>{country}</span>
      <span className={'place'}>{place}</span>
    </div>
  </div>
);

export default function Home({galleries}) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>test</h1>
        <div className={'showcase'}>
          {galleries.map(
            gallery => photoBox(gallery.src, gallery.country, gallery.place,
              gallery.link))}
        </div>
      </main>

      <style jsx>{`
        
      `}</style>
    </div>
  )
}

export async function getStaticProps() {
  //const response = await fetch('file://c/projects/serverless-gallery/frontend-next/galleries/categories.json');
  return {
    props: {
      galleries: galleries//await response.json(),
    },
  }
}
