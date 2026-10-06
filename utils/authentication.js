
//dependencies
  // import JWT Library
const jwt = require('jsonwebtoken');

const { Challenge, Post } = require('../models');  // look up chalenges or post?

const expiration = '15m';

  // make a token for register and login
function sessionToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiration });
}

// middleware
function verifyUserAccess(req, res, next) {
 // look for header
  const securityHeader = req.headers.authorization;

    // if not header / reject token
    if (!securityHeader || !securityHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Access denied. Please log in.'
      });
    }

// split bearer the token out
  const token = securityHeader.split(' ')[1];

  // check signature and expiration

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // attach users info to request object
      req.user = decoded;

      next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token.'
    });
  }

}
 

// check if user ownes challenge
async function confirmChallengeOwner(challengeId, req, res) {
  const challenge = await Challenge.findbyId(challengeId);

  // if user doesn't own project return null and send error response
  if (!challenge) {
    res.status(404).json({ message: 'Challenge not found' });
    return null;
  }

  // if user doesn't owns project send errpr respnse
  if (challenge.user.toString() !== req.user._id) {
    res.status(403).json({ message: 'You do not have permission to manage this challenge.' });
    return null;
  }

  return challenge;
}

// check if user owns post
async function confirmPostOwner(postId, req, res) {
  const post = await Post.findById(postId).populate('challengeId');

  //
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
  }

  if (!post.challengeId) {
    res.status(400).json({ message: 'This post has no parent and no associated challenge.' })
  }

  // if user doesn't own return null and send errr
  if (post.challengeId.user.toString() !== req.user._id) {
    res.status(403).json({
      message: 'You are not allowed to access this post.'
    });

  }

  return post;
}


// exports
module.exports = { sessionToken, confirmChallengeOwner, confirmPostOwner,verifyUserAccess };