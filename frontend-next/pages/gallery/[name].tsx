import { useRouter } from 'next/router';
import React from 'react'
import dynamic from 'next/dynamic'

const Gallery = dynamic(
  () => import('../../components/Gallery'),
  { ssr: false }
)

import images from '../../public/galleries/fiordland.json'

const Post = () => {
  const router = useRouter();
  const { name } = router.query;

  return <Gallery images={images} />;

  //const response = await fetch(`/galleries/${gallery}.json`);
}

export default Post;
