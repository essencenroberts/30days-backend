// routes/api/challengeRoutes.js -- all of these routes require logged-in user 

const express = require('express');
const router = express.Router();

// iimport all routes from controller
const {
  getChallengeById,
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} = require('../../controllers/challengeController');

const { verifyUserAccess } = require('../../middleware/authMiddleware');

const postRoutes = require('./postRoutes');

// middleware
router.use(verifyUserAccess)

// routes CRUD use router.rout(path) to group several methods that share the same URL

// challenge routes
router
  .route('/')
  .get(getChallenges) // list challenges 
  .post(createChallenge); // create a challenge

router
  .route('/:challengeById')
  .get(getChallengeById) // view one
  .put(updateChallenge) // update
  .delete(deleteChallenge); // delete

  router.use('/:challengeId/posts', postRoutes);

// post routes
module.exports = router;
