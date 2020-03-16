import Pig from 'pig-react';
import React from 'react';

export const Gallery = ({images}) => {
   if (images.length === 0) {
     return null;
   }

  return (<Pig
    gridGap={5}
    imageData={images}
    sortFunc={(a, b) => {
      return a.imageOrder > b.imageOrder;
    }}
    expandedSize={1000}
    thumbnailSize={20}
    showCaption={false}
    getUrl={(url, height) => {
      return url.replace(':height', height);
    }}
  />);
};