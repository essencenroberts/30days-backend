// list , create, view, update, delete ; protected 

// load import Challenge and Post schema, authentication, and dates
const { Challenge, Post } = require('../models');
const confirmChallengeOwner = require('../utils/authentication');
const calculateScheduledDate = require('../utils/dates');

// GET see all challenges /api/challenges private/protected
async function getChallenges(req, res, next) {
  try {
    
    //find only challenges owned by user
    const challenges = await Challenge.find({ owner: req.user._id })/scrollTo({ startDate: -1 });

    return res.json(challenges);
  } catch (error) {
    next(error);
  }
}

// POST create challenge private
async function createChallenge(req, res, next) {
  try {
    const { challengeName, description, startDate, lengthInDays, postPerDay } = req.body;

    // check if name and date value
    if (!challengeName || !startDate) {
      return res.status(400).json({
        message: 'Please provide a challenge name and start date'
      });
    }

    // create challenge
    const challenge = await Challenge.create({
      challengeName,
      description,
      startDate,
      lengthInDays,
      postPerDay,
      owner: req.user._id,
    });

    return res.status(201).json(challenge);
  } catch (error) {
    next(error);
  }
}

// GET see one challenge /api/challenges/:challengedId private
async function getChallengeById(req, res, next) {
  try {
    // find challenge check owner 
    const challenge = await confirmChallengeOwner(req.params.challengeId, req, res);
    if (!challenge) return;

    return res.json(challenge);
  } catch (error) {
    next(error);
  }
}

//PUT update a challenge /api/challenges/:challengeId private
async function updateChallenge(req, res, next) {
  try {
    
    const challenge = await confirmChallengeOwner(req.params.challengeId, req, res);
    if (!challenge) return;

    if (req.body.lengthInDays !== undefined) {
      const postPastEnd = await Post.findOne({
        challenge: challenge._id,
        dayNumber: { $gt: Number(req.body.lengthInDays) },
      });

      if (postPastEnd) {
        return res.status(400).json({
          message: `Day ${postPastEnd.dayNumber} had a planned post. Move or delete posts after day ${req.body.lengthInDays} before shortening this challenge`
        });
      }  
    }

    // copy fields user is allowed to change
    const allowedFields = ['challengeName', 'description', 'startDate', 'lengthInDays', 'postPerDay'];

    // update
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        challenge[field] = req.body[field];
      }
    });

    const startDateChanged = challenge.isModified('startDate');

    await challenge.save();

    if (startDateChanged) {
      const posts = await Post.find({ challenge: challenge._id });

      await Promise.all(
        posts.map((post) => {
          post.scheduledDate = calculateScheduledDate(challenge.startDate, post.dayNumber)
          return post.save();
        })
      );
    }

    return res.json(challenge);
  } catch (error) {
    next(error);
  }
}

// DELETE a challenge /api/challenges/:challengeId private
async function deleteChallenge(req, res, next) {
  try {
    const challenge = await confirmChallengeOwner(req.params.challengeId, req, res);
    if (!challenge) return;

    // delete every post in challenge
    await Post.deleteMany({ challenge: challenge._id });
    // delete challenge
    await challenge.deleteOne();

    //nofirmation
    return res.json({
      message: 'Challenge and its posts were deleted',
      challengeId: challenge._id,
    });
  } catch (error) {
    next(error);
  }
}


// export
module.exports = {
  getChallengeById,
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
};