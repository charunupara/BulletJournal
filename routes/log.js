const express = require('express');
const router = express.Router();
const Log = require('../models/Log');


// Get all logs
router.get('/', async (req, res) => {
    try {
        const logs = await Log.find();
        res.json(logs)
    } catch (err) {
        res.json({message: err})
    }
});


// Get a specific log
router.get('/:logId', async (req, res) => {
    try {
        const log = await Log.findById(req.params.logId);
        res.json(log);
    } catch (err) {
        res.json({message: err});
    }
});

// Create new log
router.post('/', async (req, res) => {
    
    const newLog = new Log({
        title: req.body.title,
        category: req.body.category,
        status: req.body.status,
        date: req.body.date
    });

    try {
        const savedLog = await newLog.save();
        res.json(savedLog)
    } catch (err) {
        res.json({message: err})
    }
    
}); 

// TODO: allow user to update logs


// Delete a specific log
// TODO: change remove to deleteOne
router.delete('/:logId', async (req, res) => {
    try {
        const removedLog = await Log.remove({_id: req.params.logId});
        res.json(removedLog)
    } catch (err) {
        res.json({message: err})
    }
});



module.exports = router;