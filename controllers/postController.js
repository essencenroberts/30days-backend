// post inside a challenge routes are protected - check user owns the PARENT challenge

const Post = require('../models');

const { confirmChallengeOwner, confirmPostOwner } = require('../utils/authentication');

const calculateSchuedledDate = require('../utils/dates');


// function for if this post belongs to challenge URL 
function belongsToChallenge(post, challengeId) {
  return post.challenge._id.toString() === challengeId;
}

// function for if its a valid day for the challenge

function isValidDay(dayNumber, challenge) {
  const day = Number(dayNumber);
  return Number.isInteger(day) && day >= 1 && day <= challenge.lengthInDays;
}

// ROUTES

  // GET all posts in challange /api/challenge/:challengeId/posts
async function getPosts(req, res, next) {
  try {
    // confirm challenge + user owns it
    const challenge = await confirmChallengeOwner(req.params.challengeId, req, res)

    if (!challenge) return;

    // search filter 
    const filter = { challenge: challenge._id };

    // req.query
    if (req.query.status) filter.status = req.query.status;
    if (req.query.platform) filter.platform = req.query.platform;

    // sort by day 
    const posts = await Post.find(filter).sort({ dayNumber: 1, postTime: 1, createdAt: 1 })

    return res.json(posts)
  
  } catch (error) { 
    next(error);
  }
}

  // POST create a post /api/challenges/:challengeId/posts
  async function createPost(req, res, next) {
    try {
      const challenge = await confirmChallengeOwner(req.params.challengeId, req, res,);
      if (!challenge) return

      const { dayNumber, title, platform, contentType, caption, status, postTime, link, mediaUrls  } = req.body;

      // check required
      if (dayNumber === undefined || !title || !platform || !contentType) {
        return res.status(400).json({
          message: 'Please provide a day number, title, platform, and content type'
        });
      }

      // create post 
      const post = await Post.create({
        challenge: challenge._id,
        createdBy: req.user._id,
        dayNumber: Number(dayNumber),
        scheduledDate: calculateSchuedledDate(challenge.startDate, Number(dayNumber)),
        title,
        platform,
        contentType,
        caption,
        status,
        postTime,
        link,
        mediaUrls,
      });

      return res.status(201).json(post)
    } catch (error) {
      next(error);
    }
  }

  //GET one post /api/challenges/:challengeId/posts/:postId
  async function getPostById(req, res, next) {
    try {
      //find post + show challenge + check users owns
      const post = await confirmPostOwner(req.parans.postId, req, res);
      if (!post) return;

      //check  post is in challenge in URL
      if (!belongsToChallenge(post, req.params.challengeId)) {
        return res.status(404).json({ message: 'Post not found in this challenge' })
      }
      //
      post.depopulate('challenge');

      return res.json(post);
    } catch (error) {
      next(error)
    }
  }

  //UPDATE post /api/challenges/:challlengesId/posts/:postId
async function updatePost(req, res, next) {
  try {
      const post = await confirmPostOwner(req.params.postId, req, res);
      if (!post) return

      if (!belongsToChallenge(post, req.params.challengeId)) {
        return res.status(404).json({ message: 'Post not found in this challenge' })
      }

      const challenge = post.challenge;

      // check new day for challenge 
      if (req.body.dayNumber !== undefined) {
        if (!isValidDay(req.body.dayNumber, challenge)) {
          return res.status(400).json({
            message: `Day number must be a whole number from 1 to ${challenge.lengthInDays}`,
          });
        }

        post.dayNumber = Number(req.body.dayNumber);
        post.scheduledDate = calculateSchuedledDate(challenge.startDate, post.dayNumber);
      }

      const allowedFields = ['title', 'caption', 'platform', 'contentType', 'status', 'postTime', 'link', 'mediaUrs']

      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          post[field] = req.body[field];
        }
      });

      // .save()
      await post.save();

      post.depopulate('challenge');

      return res.json(post)

  } catch (error) {
    next(error);
  }
}


  // DELETE post /api/challenges/:challengeId/posts/:postId
  async function deletePost(req, res, next) {
    try {
      const post = await confirmPostOwner(req.params.postId, req, res);
      if (!post) return;

      if (!belongsToChallenge(post, req.params.challengeId)) {
        return res.status(404).json({
          message: 'Post not found in this challenge'
        });
      }

      await post.deleteOne();

      // send ID so front end deletes the right one
      return res.json({
        message: 'Post deleted', postId: post._id 
      });
    } catch (error) {
      next(error)
    }
  }

  module.exports = { getPosts, createPost, getPostById, updatePost, deletePost }; 