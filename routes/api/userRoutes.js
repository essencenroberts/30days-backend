// import express, router, User model, authentication, and jswonwebtoken
const express = require('express');
const router = express.Router();
const User = require('../../models/userSchema');
const { registerUser, loginUser } = require('../../controllers/userController');
const sessionToken = require ('../../utils/authentication');



// REGISTRATION
  // create new user POST /api/users/register
router.post('/api/users/register', async (req, res) => {
  try {

   const { username, email, password } = req.body || {};

   // create new user
   const newUser = await User.create({
    username,
    email, 
    password,
   });

  const token = sessionToken(newUser);

  res.status(201).json({
    token,
    newUser: {
      _id: newUser._id, username: newUser.username, email: newUser.email
    },
  });
  } catch (err) {
    
    // if email is already taken
    if (err.code == 11000) {
      return res.status(400).json({
        message: 'This email or username is already in use. Try again.'
      });
    }
    // validation error
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// LOGIN
  // find user by email /api/users/login POST
router.post('/api/users/login', async (req, res) => {
  try {
    // req.body
    const { email, password } = req.body || {};
    // find user by email
    const user = await User.findOne({ email });

    // if found no user and check if correct password
    if (!user || !(await user.isCorrectPassword(password))) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    // if correct
    const token = sessionToken(user); // generate new token if they pass and eveyrthing is correct

    res.json({
      token,
      user: { _id: user._id, username: user.username, email: user.email },
    }); // sucess 
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })

  }
});

module.exports = router;