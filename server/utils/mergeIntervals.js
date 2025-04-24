module.exports = function mergeIntervals(intervals) {
    if (intervals.length <= 1) return intervals;

    // Sort intervals by the starting times
    intervals.sort((a, b) => a[0] - b[0]);

    let merged = [];
    let current = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        // If intervals overlap, merge them
        if (current[1] >= intervals[i][0]) {
            current[1] = Math.max(current[1], intervals[i][1]);
        } else {
            // No overlap, add the current interval to the result
            merged.push(current);
            current = intervals[i];
        }
    }

    // Add the last interval
    merged.push(current);

    return merged;
}
