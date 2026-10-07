
// user accounts: register, login and user profile

// load user model
const { User } = require('../models');

const { sessionToken } = require('../utils/authentication');

// REGISTER POST /api/users/register username, email, password
async function registerUser (req, res, next) {
  try {
    const { username, email, password } = req.body;

    //check all 3 were sent
    if (!username || !email || !password) {
      return res.status(400).json({
     message: 'Please provide a username, email, and password' });
    }

    // create user
    const user = await User.create({ username, email, password });

    // pass sessionToken to user
    const token = sessionToken(user);

    return res.status(201).json({ token, user});
  } catch (error) {
    next(error);
  }

};

// LOGIN POST /api/users/login email password

async function loginUser (req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an email and password',
      });
    }

    // find user by email lowercase emails
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    //check user exists and password is correct
    if (!user || !(await user.isCorrectPassword(password))) {
     return res.status(401).json({
      message: 'Incorrect email or password', 
      });
    }

    const token = sessionToken(user)

    res.json({ token, user });

  } catch (error) {
    next(error)
  }
}
  
  

// GET /api/users/me -- to het user profile - protected
async function getMe(req, res, next) {
  try {
    // get user info by ID
    const user = await User.findById(req.user._id);

    // if tokenn valid but accout doesn't exist
    if (!user) {
      return res.status(404).json({ message: 'User not found'
      });
    }

    return res.json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = { registerUser, loginUser, getMe };