const express = require("express");
const router = express.Router();
const Progress = require('../models/progressModel');
const mergeIntervals = require('../utils/mergeIntervals');  // Add this import if needed


router.post('/', async (req, res) => {
    const { userId, lastWatchedTime, watchedIntervals } = req.body;

    if (!userId || lastWatchedTime == null || !Array.isArray(watchedIntervals)) {
        return res.status(400).json({ error: 'Missing or invalid data' });
    }

    try {
        // Merging the new intervals with existing ones IF USER's DOCUMENT EXISTS || creating new document...
        let progress = await Progress.findOne({ userId });

        if (progress) {
            // Merging the existing watched intervals with new ones...
            let mergedIntervals = mergeIntervals([...progress.watchedIntervals, ...watchedIntervals]);

            // Updating the user's progress with merged intervals...
            progress.watchedIntervals = mergedIntervals;
            progress.lastWatchedTime = lastWatchedTime;
            await progress.save();

            console.log('Progress updated for', userId);
        } else {
            // CREATE a new progress record if the user doesn't exist...
            const newProgress = new Progress({
                userId,
                lastWatchedTime,
                watchedIntervals
            });

            await newProgress.save();
            console.log('Progress saved for new user', userId);
        }

        res.status(200).json({ message: 'Progress saved successfully' });
    } catch (error) {
        console.error('Error saving progress:', error);
        res.status(500).json({ error: 'Failed to save progress' });
    }
});

// Sent the user data to this route for frontend...
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const progress = await Progress.findOne({ userId });

        if (progress) {
            res.status(200).json(progress);  // Sent the user progress data...
        } else {
            res.status(200).json({ userId, lastWatchedTime: 0, watchedIntervals: [] }); // Passing empty watchedIntervals...
        }
        
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
});

// DELETE endpoint to clear progress for a user...
router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await Progress.deleteOne({ userId });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Progress cleared successfully' });
        } else {
            res.status(404).json({ message: 'No progress found to delete' });
        }
    } catch (error) {
        console.error('Error clearing progress:', error);
        res.status(500).json({ error: 'Failed to clear progress' });
    }
});

module.exports = router;