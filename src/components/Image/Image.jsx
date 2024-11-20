import React from 'react';

export const Image = ({
  src,
  alt = '',
  width = '100%',
  height = 'auto',
  maxWidth = 640,
  maxHeight = 'auto',
}) => {
  return (
    <p align='center'>
      <img
        src={src}
        loading='lazy'
        style={{
          display: 'block',
          maxWidth: `${maxWidth}px`,
          maxHeight: `${maxHeight}px`,
          margin: 'auto',
          width: `${width}px`,
          height: `${height}px`,
        }}
        width={`${width}`}
        height={`${height}`}
        alt={alt}
      />
    </p>
  );
};
