const express = require('express');
const router = express.Router();
const Event = require('../models/Event');


router.get('/', async (req, res) =>{
  try {
      const events = await Event.find();
      res.status(200).json(events);
  } catch (err) {
      res.status(404).json({message: err})
  }
})

router.post('/', async (req, res) => {
  const newEvent = new Event({
      title: req.body.title,
      irrelevant: req.body.irrelevant,
      date: req.body.date
  });

  try {
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
  } catch (err) {
      res.status(404).send(err);
  }
})

module.exports = router;