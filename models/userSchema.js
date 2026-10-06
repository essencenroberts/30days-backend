// import mongoose and bcrypt
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { report } = require('../routes/api/userRoutes');

// define schema with fields username, email, password,
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },

  password: { 
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
  },
  
},
    { timestamps: true }

);

//pre-save hook to hashpassword
userSchema.pre('save', async function() {
  if (!this.isModified('password')) 
    return;

  const saltRounds = 10; //
  this.password = await bcrypt.hash(this.password, saltRounds);
  

});

//password checker
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

// remove/hide the password from response after registering
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete report.__v;
    return ret;
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;