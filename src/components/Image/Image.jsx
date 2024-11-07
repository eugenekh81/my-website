import React from 'react';

export const Image = ({ src, alt = '' }) => {
  return (
    <p align='center'>
      <img
        src={src}
        loading='lazy'
        style={{
          display: 'block',
          maxWidth: '640px',
          margin: 'auto',
          width: '100%',
        }}
        alt={alt}
      />
    </p>
  );
};
