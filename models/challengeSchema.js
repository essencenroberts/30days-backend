// import mongoose

const mongoose = require('mongoose');

// define challengeSchema for challenge inclduing name, description, start date, length in days, challenge owner

const challengeSchema = new mongoose.Schema({
  challengeName: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
    maxlength: [300, 'Description must be 300 characters or less'],
  },

  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },

  lengthInDays: {
    type: Number,
    required: true,
    default: 30,
    min: [30, 'A challenge must be at least 30 days'],
    max: [90, 'A challenge can be at most 90 days'],
  },

  postPerDay: {
    type: Number,
    required: true,
    default: 1,
    min: [1, 'Posts per day must be at least 1'],
    max: [10, 'Posts per day cannot exceed 10'],
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

// invited users 
  collaborators: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

},
  { timestamps: true }
);

// virtual field for end date calculations
challengeSchema.virtual('endDate').get(function () {
  const end = new Date(this.startDate);
  end.setDate(end.getDate() + this.lengthInDays -1);
  return end;
});

// total posts needed days * posts per day
challengeSchema.virtual('totalPostGoal').get(function () {
  return this.lengthInDays * this.postPerDay;
});

challengeSchema.set('toJSON', { virtuals: true }); // include this when sent
// export model 
const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;