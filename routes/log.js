const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const verify = require('./verifyToken');


// TODO: look up how to handle status code for different errors types

// Get all logs
router.get('/', verify, async (req, res) => {
    try {
        const logs = await Log.find({author: req.user._id});
        res.status(200).json(logs);
    } catch (err) {
        res.status(404).json({message: err})
    }
});


// Get a specific log
router.get('/:logId', async (req, res) => {
    try {
        const log = await Log.findById(req.params.logId);
        res.status(200).json(log);
    } catch (err) {
        res.status(400).json({message: err});
    }
});

router.get('/:logId/title', async (req, res) => {
    try {
        const log = await Log.findById(req.params.logId);
        const logTitle = log.title;
        res.status(200).json(logTitle);
    } catch (err) {
        res.status(400).json({message: err});
    }
});

router.get('/:logId/category', async (req, res) => {
    try {
        const log = await Log.findById(req.params.logId);
        const logCategory = log.category;
        res.status(200).json(logCategory);
    } catch (err) {
        res.status(400).json({message: err});
    }
});

router.get('/:logId/isRelevant', async (req, res) => {
    try {
        const log = await Log.findById(req.params.logId);
        const logIsRelevant = log.isRelevant;
        res.status(200).json(logIsRelevant);
    } catch (err) {
        res.status(400).json({message: err});
    }
});

router.get('/:logId/isComplete', async (req, res) => {
    try {
        const log = await Log.findById(req.params.logId);
        if (log.category !== "task") {
            throw new Error("Log is not a task");
        }
        else {
            const logIsComplete = log.isComplete;
            res.status(200).json(logIsComplete);
        }
    } catch (err) {
        res.status(400).json({message: err});
    }
});

router.get('/:logId/date', async (req, res) => {
    try {
        const log = await Log.findById(req.params.logId);
        const logDate = log.date;
        res.status(200).json(logDate);
    } catch (err) {
        res.status(400).json({message: err});
    }
});

// Create new log
router.post('/', verify, async (req, res) => {
    
    const newLog = new Log({
        title: req.body.title,
        category: req.body.category,
        isRelevant: req.body.isRelevant,
        isComplete: req.body.category === "task" ? false : null,
        date: req.body.date,
        author: req.user._id
    });


    try {
        const savedLog = await newLog.save();
        res.status(201).json(savedLog)
    } catch (err) {
        res.status(404).json({message: err})
    }
    
}); 

// Update a specific log (using PUT request)
router.patch('/:logId', async (req, res) => {
    try {
        const updatedLog = await Log.updateOne({ _id: req.params.logId}, { $set:{title: req.body.title, category: req.body.category, isRelevant: true}}); // change title
        res.status(200).json(updatedLog);
    } catch (err) {
        res.status(404).json({message: err})
    }
})


router.patch('/:logId/title', async (req, res) => {
    try {
        const updatedLog = await Log.updateOne({ _id: req.params.logId}, { $set:{title: req.body.title}}); // change title
        res.json(updatedLog);
    } catch (err) {
        res.status(404).json({message: err})
    }
})

router.patch('/:logId/category', async (req, res) => {
    try {
        const updatedLog = await Log.updateOne({ _id: req.params.logId}, { $set:{category: req.body.category}}); // change category
        res.json(updatedLog);
    } catch (err) {
        res.status(404).json({message: err})
    }
})

router.patch('/:logId/isComplete', async (req, res) => {
    try {
        const updatedLog = await Log.updateOne({ _id: req.params.logId}, { $set:{isComplete: req.body.isComplete}}); // change complete boolean
        res.json(updatedLog);
    } catch (err) {
        res.status(404).json({message: err})
    }
})


router.patch('/:logId/isRelevant', async (req, res) => {
    try {
        const updatedLog = await Log.updateOne({ _id: req.params.logId}, { $set:{isRelevant: req.body.isRelevant}}); // change relevant boolean
        res.json(updatedLog);
    } catch (err) {
        res.status(404).json({message: err})
    }
})

router.patch('/:logId/date', async (req, res) => {
    try {
        const updatedLog = await Log.updateOne({ _id: req.params.logId}, { $set:{date: req.body.date}}); // change date
        res.json(updatedLog);
    } catch (err) {
        res.status(404).json({message: err})
    }
})


// Delete a specific log
router.delete('/:logId', async (req, res) => {
    try {
        const removedLog = await Log.deleteOne({_id: req.params.logId});
        res.status(204).json(removedLog)
    } catch (err) {
        res.status(404).json({message: err})
    }
});



module.exports = router;