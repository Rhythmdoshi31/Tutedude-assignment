import React from 'react';

const VerticalProgressBar = ({ progress }) => {
  const progressHeight = `${progress}%`;

  return (
    <div className='h-full flex flex-col items-center justify-center'> 
        <div className="w-full w-8 h-full bg-gray-200 rounded-lg relative">
            <div
            className="bg-blue-500 rounded-lg absolute bottom-0 w-full"
            style={{ height: progressHeight }}
            />
        </div>
        {/* Progress percentage */}
        <div className="text-green-400 text-lg font-bold pt-2">
        {progress}%
        </div>
    </div>
  );
};

export default VerticalProgressBar;
