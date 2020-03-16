import React, { useEffect, useState } from 'react';
import ProgressiveImage from 'react-progressive-image';

export const GalleryList = ({ router }) => {
  const [galleries, setGalleries] = useState([]);

  useEffect(async () => {
    const response = await fetch('/galleries/categories.json');
    setGalleries(await response.json());
  }, []);

  const photoBox = (src, country, place, link) => (
    <div className={'photo'} onClick={() => {/*router.push(link)*/}}>
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
