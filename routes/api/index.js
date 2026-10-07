// export all routes from here

const express = require('express');
const router = express.Router()

// load routes
const userRoutes = require('./userRoutes');
const challengeRoutes = require('./challengeRoutes')
const postRoutes = require('./postRoutes');

// 
router.use('/users', userRoutes);

router.use('/challenges', challengeRoutes);

router.use('/posts', postRoutes);

module.exports = router;