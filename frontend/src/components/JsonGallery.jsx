import React, { useEffect, useState } from 'react';
import {
  useParams
} from "react-router-dom";
import { Gallery } from './Gallery';

export const JsonGallery = () => {
  const [images, setImages] = useState([]);
  const { gallery } = useParams();

  useEffect(() => {
    const getGalleries = async () => {
      const response = await fetch(`/galleries/${gallery}.json`);
      setImages(await response.json());
    };
    getGalleries();
  }, []);

  return <Gallery images={images} />;
};