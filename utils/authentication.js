// Helper functions for authentication and authorization
  // - sessionToken - creates JWT at register and login
  // - confirmChallengeOwner: checks a user owns a challenge- confirmPostOwner: checks a user owns a post

//dependencies
  // import JWT Library
const jwt = require('jsonwebtoken');

const { Challenge, Post } = require('../models');  // load chalenges or post?

const expiration = '2h';

  // make a token for register and login
function sessionToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiration });
}

// middleware

 

// check if user ownes challenge
async function confirmChallengeOwner(challengeId, req, res) {
  //look up challenge by ID
  const challenge = await Challenge.findById(challengeId);

  // if user doesn't own project return null and send error response
  if (!challenge) {
    res.status(404).json({ message: 'Challenge not found' });
    return null;
  }

  // if user doesn't owns project send errpr respnse
  if (challenge.owner.toString() !== req.user._id) {
    res.status(403).json({ message: 'You do not have permission to manage this challenge.' });
    return null;
  }

  return challenge;
}

// check if user owns post
async function confirmPostOwner(postId, req, res) {
  const post = await Post.findById(postId).populate('challenge');

  // no post with that ID exists
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return null;
  }

  // post exits but challenged deleted 
  if (!post.challenge) {
    res.status(400).json({ message: 'The challenge for this post no longer exists.' })
    return null;
  }

  // if user doesn't own return null and send errr
  if (post.challenge.owner.toString() !== req.user._id) {
    res.status(403).json({
      message: 'You are not allowed to access this post.'
    });
    return null;

  }

  return post;
}


// exports
module.exports = { sessionToken, confirmChallengeOwner, confirmPostOwner };