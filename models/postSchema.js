// import mongoose
const { Types, mongoose } = require('mongoose');

// define schema for post input fields : include _id: ObjectId, dayNumber, scheduledDate, title, caption, platform, contentType, status, link, postedAt

const postSchema = new mongoose.Schema({ 

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  dayNumber: {
    type: Number,
    required: true,
  },

  title: {
    type: String,
    required: true,
    trime: true,
  },

  caption: {
    type: String,
    trim: true,
  },

  mediaUrls: {
    type: [String],
    default: [],
  }, //array of strings for images/videos
  
  platform: {
    type: String,
    enum: ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Threads'],
    required: true,
  },

  contenType: {
    type: String,
    enum: ['short-form video', 'long-form video', 'long-form written post', 'short-form threads'],
    required: true,
  },

  scheduledDate: {
    type: Date,
  },

  status: {
    type: String,
    enum: ['idea', 'draft', 'editing', 'filming', 'scheduled', 'published', ],
    default: 'idea',
  },

  link: {
    type: String,
    trim: true,
  },

  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  
  postedAt: {
    type: date,
  },

  },
 { timestamps: true }

);

module.exports = mongoose.model('Post', postSchema);