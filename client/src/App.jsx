import React, { useEffect, useRef, useState } from 'react';
import Nav from './Components/nav';
import VerticalProgressBar from './Components/progressBar';
import { saveProgress } from './api/saveProgress';

function App() {
  const videoRef = useRef(null);
  const [watchedSeconds, setWatchedSeconds] = useState(new Set());  

  useEffect(() => {  
    let interval;
    // Method to set watchedSeconds...
    const startTracking = () => {
      interval = setInterval(() => {
        const current = Math.floor(videoRef.current.currentTime);
        setWatchedSeconds(prev => new Set(prev).add(current));
      }, 1000); 
    };
    // Method to clear interval, and get intervals and save progress...
    const stopTracking = () => {
      clearInterval(interval);
      const lastWatched = Math.floor(videoRef.current.currentTime);
      const intervals = convertToIntervals();
      const data = {
        userId: 'user1', // This can be done to be dynamic later...
        lastWatchedTime: lastWatched,
        watchedIntervals: intervals,
      };
      saveProgress(data); //Sending this data to backend via /api/progress...
    };

    const video = videoRef.current;
    video.addEventListener('play', startTracking);
    video.addEventListener('pause', stopTracking);
    video.addEventListener('ended', stopTracking);

    return () => {
      video.removeEventListener('play', startTracking);
      video.removeEventListener('pause', stopTracking);
      video.removeEventListener('ended', stopTracking);
    };
  }, [watchedSeconds]);

  // Converting seconds in Set to Intervals...
  const convertToIntervals = () => {
    const sorted = [...watchedSeconds].sort((a, b) => a - b);
    const intervals = [];
    let start = sorted[0];
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] !== sorted[i - 1] + 1) {
        intervals.push([start, sorted[i - 1]]);
        start = sorted[i];
      }
    }
    if (start !== undefined) intervals.push([start, sorted[sorted.length - 1]]);
    return intervals;
  };

  // Getting Percentage of Progress...
  const totalDuration = videoRef.current?.duration || 1;
  const totalWatched = [...watchedSeconds].length;
  const progress = Math.round((totalWatched / totalDuration) * 100);

  return (
    <div className='bg-black h-screen w-full text-white px-8'>
      <Nav/>
      <div className='block md:flex items-top mt-12 h-[80vh]'>
        <div className='w-[90%] md:w-[60%] h-[50%] md:h-[80%] mx-4'>
          <video ref={videoRef} src="src/assets/video.mp4" className='w-full h-full object-cover' autoPlay muted controls></video>
        </div>
        <div className='mt-5 md:mt-0 h-[45%] md:h-[75%]'>
          <VerticalProgressBar progress={progress} />
        </div>
      </div>
    </div>
  );
}

export default App;
