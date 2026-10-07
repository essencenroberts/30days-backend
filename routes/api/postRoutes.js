// posts URLS nested inside a challenge so use mergeParams 

const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = require('../../controllers/postController');

// const { get } = require('./userRoutes');

// /api/challenges/:challengeId/posts
router
  .route('/')
  .get(getPosts) // list every post in challenge
  .post(createPost) // add post to challenge

// /api/challenges/:challengeId/posts/:postId
router
  .route('/:postId')
  .get(getPostById) // view one
  .put(updatePost) // update
  .delete(deletePost) // delete


module.exports = router;