import React from 'react';

export const CodePenSnippet = ({ src }) => {
  return (
    <div style={{ margin: '0 0 20px' }}>
      <iframe
        src={src}
        title='lesson-01-headings'
        allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
        sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
        style={{
          width: '100%',
          border: '0',
          height: '500px',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      ></iframe>
    </div>
  );
};
