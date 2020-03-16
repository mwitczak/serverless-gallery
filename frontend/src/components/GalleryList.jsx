import React, { useEffect, useState } from 'react';
import ProgressiveImage from 'react-progressive-image';
import { useHistory } from 'react-router-dom';

export const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const getGalleries = async () => {
      const response = await fetch('/galleries/categories.json');
      setGalleries(await response.json());
    };
    getGalleries();
  }, []);

  const photoBox = (src, country, place, link) => (
    <div className={'photo'} onClick={() => {history.push(place)}}>
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

  return (
    <div className={'showcase'}>
      {galleries.map(
        gallery => photoBox(gallery.src, gallery.country, gallery.place,
          gallery.link))}
    </div>
  );
};
