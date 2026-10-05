// export all models from here

const User = require('./userSchema');
const Post = require('./postSchema');
const Challenge = require('./challengeSchema');

module.exports = { User, Post, Challenge };