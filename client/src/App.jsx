import React, { useEffect, useState, useRef } from 'react';
import Nav from './Components/nav';
import VerticalProgressBar from './Components/progressBar';

function App() {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress.toFixed(0)); // Convert to integer percentage
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  return (
    <div className='bg-black h-screen w-full text-white px-8'>
      <Nav />
      <div className='flex items-top mt-12 h-[80vh]'>
        <div className='w-[60%] h-[80%] mx-4'>
          <video
            ref={videoRef}
            src="src/assets/video.mp4"
            className='w-full h-full object-cover'
            autoPlay
            muted
            loop
            controls
          ></video>
        </div>
        <div className='h-[75%]'>
          <VerticalProgressBar progress={progress} />
        </div>
      </div>
    </div>
  );
}

export default App;
