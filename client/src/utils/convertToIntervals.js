export const convertToIntervals = (watchedSeconds) => {
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
  