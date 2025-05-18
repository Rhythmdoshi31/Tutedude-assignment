// Saving progress to DB once video is paused / ended...

export const saveProgress = async (progress) => {
  try {
    const response = await fetch('https://videoprogresslogger.onrender.com/api/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(progress),
    });

    if (!response.ok) {
      throw new Error('Failed to save progress');
    }

    const data = await response.json();
    console.log('Progress saved:', data);
  } catch (error) {
    console.error("Error saving progress:", error);
  }
};
