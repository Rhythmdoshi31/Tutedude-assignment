import React from 'react';

const handleClearProgress = async () => {
  try {
    const userId = "user1"; // or however you're storing the current user

      const response = await fetch(`https://videoprogresslogger.onrender.com/api/progress/${userId}`, {
          method: 'DELETE'
      });

      if (response.ok) {
          console.log('Progress cleared');
          // Optionally reload or reset state
      } else {
          console.error('Failed to clear progress');
      }
  } catch (error) {
      console.error('Error while clearing progress:', error);
  }
};

function Nav(){
    return (<nav className='flex justify-between items-center py-4 border-b border-gray-700'>
        <div className=''>
          <h1 className='text-3xl font-semibold tracking-wide px-4'>Video Progess Tracker</h1>
        </div>
        <button className='p-2 px-4 rounded-3xl border-1 border-gray-200 hover:text-black hover:bg-white hover:border-black transition duration-300' onClick={handleClearProgress}>Clear Progress</button>

    </nav>
    );
};

export default Nav;