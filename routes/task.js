const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


router.get('/', async (req, res) =>{
  try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
  } catch (err) {
      res.status(404).json({message: err})
  }
})

router.post('/', async (req, res) => {
  const newTask = new Task({
      title: req.body.title,
      completed: req.body.completed,
      irrelevant: req.body.irrelevant,
      date: req.body.date
  });

  try {
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
  } catch (err) {
      res.status(404).send(err);
  }
})

module.exports = router;