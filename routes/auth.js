const router = require("express").Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/register', async (req, res) => { 

  // Validate data before creating user
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email is already in database
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send("Email already exists");

  // Check if username is already in database
  const userNameExist = await User.findOne({username: req.body.username});
  if (userNameExist) return res.status(400).send("Username already exists")

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const newUser = await user.save();
    res.send({user: user._id});
  } catch (err) {
    res.status(400).send(err);
  }

});

router.post('/login', async (req, res) => {
  // Validate data before logging in user
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email exists
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send("Wrong email");

  // Check if password if correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Wrong password")


  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);

  

});



module.exports = router;