const express = require('express');
const router = express.Router();
const Note = require('../models/Note');


router.get('/', async (req, res) =>{
  try {
      const notes = await Note.find();
      res.status(200).json(notes);
  } catch (err) {
      res.status(404).json({message: err})
  }
})

router.post('/', async (req, res) => {
  const newNote = new Note({
      title: req.body.title,
      description: req.body.description,
      irrelevant: req.body.irrelevant,
      date: req.body.date
  });

  try {
      const savedNote = await newNote.save();
      res.status(201).json(savedNote);
  } catch (err) {
      res.status(404).send(err);
  }
})

module.exports = router;