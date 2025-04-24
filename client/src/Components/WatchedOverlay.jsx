import React from 'react';

const WatchedOverlay = ({ intervals, duration }) => {
  return intervals.map(([start, end], index) => {
    const startPercentage = (start / duration) * 100;
    const endPercentage = (end / duration) * 100;
    const width = endPercentage - startPercentage;

    return (
      <div
        key={index}
        style={{
          position: 'absolute',
          left: `${startPercentage}%`,
          width: `${width}%`,
          height: '100%',
          backgroundColor: 'green',
        }}
      />
    );
  });
};

export default WatchedOverlay;
