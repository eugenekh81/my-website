import React from 'react';

export const Image = ({
  src,
  alt = '',
  width = '100%',
  height = 'auto',
  maxWidth = 640,
}) => {
  return (
    <p align='center'>
      <img
        src={src}
        loading='lazy'
        style={{
          display: 'block',
          maxWidth: `${maxWidth}px`,
          margin: 'auto',
          width,
          height,
        }}
        alt={alt}
      />
    </p>
  );
};
