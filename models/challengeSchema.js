// import mongoose

const { mongo, default: mongoose } = require("mongoose");

// define challengeSchema for challenge inclduing name, description, start date, length in days, challenge owner

const challengeSchema = new mongoose.Schema({
  challengeName: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

},
  { timestamps: true }
);

// export model 
const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;