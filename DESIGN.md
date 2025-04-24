# Design Documentation

## Overview
This document explains the key design decisions made for the **Progress Tracking API**. It focuses on how watched intervals are tracked, merged for unique progress calculation, and the challenges faced during development.

## 1. Tracking Watched Intervals
Each watched content session is recorded as an interval containing:
- `start`: Start timestamp of the session.
- `end`: End timestamp of the session.

Multiple intervals can be submitted in one request, and these are appended to the user's progress.

## 2. Merging Intervals
To calculate unique progress, overlapping or adjacent intervals are merged. The merging process involves:
1. Sorting intervals by start time.
2. Iterating through intervals and merging overlapping ones.

### Merging Algorithm
Intervals are merged if they overlap or are adjacent. Non-overlapping intervals are added to the list.

## 3. Data Model
The MongoDB schema consists of:
- `userId`: Unique user identifier.
- `lastWatchedTime`: Most recent watch time.
- `watchedIntervals`: Array of watched intervals.

```javascript
const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  lastWatchedTime: { type: Number, required: true },
  watchedIntervals: [{ start: Number, end: Number }]
});


## 4. Error Handling

- 400 Bad Request for invalid data.
- 500 Internal Server Error for server issues.
- 404 Not Found for missing data.

## 5. Challenges & Solutions
- Merging Intervals: Implemented an efficient sorting and comparison algorithm.
- Edge Cases: Handled overlapping, adjacent, and empty progress data.

## 6. Future Improvements
- Real-time Updates using websockets.

- Advanced Analytics for tracking user behavior.

- Scalability improvements for handling larger datasets.

## Conclusion
The API efficiently tracks user progress by merging watched intervals, ensuring accurate and unique progress data, with robust error handling and future scalability in mind.


This version keeps the key points intact while being more concise. You can save this as `DESIGN_DOCUMENTATION.md`.
