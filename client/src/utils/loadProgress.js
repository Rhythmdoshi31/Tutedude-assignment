import { fetchProgress } from '../api/fetchProgress';
// Loading the progress and putting into setWatchedSeconds, setWatchedIntervals, setLastWatchedTime...
export const loadProgress = async (setWatchedSeconds, setWatchedIntervals, setLastWatchedTime) => {
  try {
    const data = await fetchProgress('user1');
    if (!data || !Array.isArray(data.watchedIntervals)) {
      alert("No valid intervals found");
      return;
    }

    const loadedSeconds = new Set();
    data.watchedIntervals.forEach(([start, end]) => {
      for (let i = start; i <= end; i++) {
        loadedSeconds.add(i);
      }
    });

    setWatchedSeconds(loadedSeconds);
    setWatchedIntervals(data.watchedIntervals);
    if (data.lastWatchedTime) {
      setLastWatchedTime(data.lastWatchedTime);
    }
  } catch (error) {
    console.error("Error loading progress:", error);
    alert("Failed to load progress");
  }
};
