import React, { useEffect, useRef, useState } from 'react';
import Nav from './Components/nav';
import VerticalProgressBar from './Components/progressBar';
import WatchedOverlay from './Components/WatchedOverlay';
import { saveProgress } from './api/saveProgress';
import { loadProgress } from './utils/loadProgress';
import { convertToIntervals } from './utils/convertToIntervals';

function App() {
  const videoRef = useRef(null);
  const [watchedSeconds, setWatchedSeconds] = useState(new Set());
  const [duration, setDuration] = useState(null);
  const [lastWatchedTime, setLastWatchedTime] = useState(0);
  const [watchedIntervals, setWatchedIntervals] = useState([]);

  // Loading progress o
  useEffect(() => {
    loadProgress(setWatchedSeconds, setWatchedIntervals, setLastWatchedTime);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const onMetadataLoaded = () => {  // Did this because Duration was being set even before Metadata wal loaded, resulting in bugs...
      setDuration(video.duration);
      if (lastWatchedTime && lastWatchedTime < video.duration) {
        video.currentTime = lastWatchedTime;
      }
    };
    video.addEventListener('loadedmetadata', onMetadataLoaded);
    return () => video.removeEventListener('loadedmetadata', onMetadataLoaded);
  }, [lastWatchedTime]);

  // Hook for working the StartTracking and StopTracking functions...
  useEffect(() => {
    let interval;
    const video = videoRef.current;

    const startTracking = () => {
      interval = setInterval(() => {
        const current = Math.floor(videoRef.current.currentTime);
        setWatchedSeconds(prev => new Set(prev).add(current));
      }, 1000);
    };
    // Saving progress on StopTracking...
    const stopTracking = () => {
      clearInterval(interval);
      const lastWatched = Math.floor(videoRef.current.currentTime);
      const intervals = convertToIntervals(watchedSeconds);
      setWatchedIntervals(intervals);
      saveProgress({ userId: 'user1', lastWatchedTime: lastWatched, watchedIntervals: intervals });
    };

    video.addEventListener('play', startTracking);
    video.addEventListener('pause', stopTracking);
    video.addEventListener('ended', stopTracking);

    return () => {
      video.removeEventListener('play', startTracking);
      video.removeEventListener('pause', stopTracking);
      video.removeEventListener('ended', stopTracking);
    };
  }, [watchedSeconds]);

  // Calculating the percentage of progress made...
  const totalWatched = watchedSeconds.size;
  const progress = duration ? Math.min(Math.round((totalWatched / duration) * 100), 100) : 0;

  return (
    <div className='bg-black h-screen w-full text-white px-8'>
      <Nav />
      <div className='flex flex-col md:flex-row items-top mt-12'>
        <div className='flex flex-col items-center md:w-[60%] mx-auto'>
          <div className='w-[90%] md:w-full h-[50%] md:h-[100%] mx-4'>
            <video ref={videoRef} src="src/assets/video.mp4" className='w-full h-full object-cover' muted controls />
          </div>
          <div className='relative w-full bg-gray-200 h-2 mt-4'>
            <WatchedOverlay intervals={watchedIntervals} duration={duration} />
          </div>
        </div>
        <div className='mt-5 md:mt-0 md:w-[35%] mx-auto'>
          <VerticalProgressBar progress={progress} />
        </div>
      </div>
    </div>
  );
}

export default App;
