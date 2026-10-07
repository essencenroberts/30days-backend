// export all routes from here

const express = require('express');
const router = express.Router()

// load routes
const userRoutes = require('./userRoutes');
const challengeRoutes = require('./challengeRoutes')

// 
router.use('/users', userRoutes);

router.use('/challenges', challengeRoutes);


module.exports = router;