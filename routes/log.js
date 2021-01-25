const express = require('express');
const router = express.Router();
const Log = require('../models/Log');


// TODO: look up how to handle status code for different errors types
// TODO: handle PATCH requests

// Get all logs
router.get('/', async (req, res) => {
    try {
        const logs = await Log.find();
        res.status(200).json(logs)
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

// Create new log
router.post('/', async (req, res) => {
    
    const newLog = new Log({
        title: req.body.title,
        category: req.body.category,
        isRelevant: req.body.isRelevant,
        date: req.body.date
    });

    try {
        const savedLog = await newLog.save();
        res.status(201).json(savedLog)
    } catch (err) {
        res.status(404).json({message: err})
    }
    
}); 

// Update a specific log (using PUT request)
router.put('/:logId', async (req, res) => {
    try {
        const updatedLog = await Log.updateOne(req.params._id, {
            title: req.body.title,
            category: req.body.category,
            isRelevant: req.body.isRelevant,
            date: req.body.date
        });
        res.status(200).json(updatedLog);
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