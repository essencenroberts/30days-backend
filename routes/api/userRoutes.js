// connect URLS to controller functionc

// import express, router, User model, authentication, and jswonwebtoken
const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getMe } = require('../../controllers/userController');

const { verifyUserAccess } = require('../../middleware/authMiddleware');




// REGISTRATION
  // create new user POST /api/users/register
router.post('/register', registerUser); 
    
    
// LOGIN
  // find user by email /api/users/login POST
router.post('/login', loginUser);

// My Profile - logged in user
router.get('/me', verifyUserAccess, getMe);


module.exports = router;