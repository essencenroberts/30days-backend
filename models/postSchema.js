// import mongoose
const  mongoose = require('mongoose');

// define schema for post input fields : include _id: ObjectId, dayNumber, scheduledDate, title, caption, platform, contentType, status, link, postedAt

const postSchema = new mongoose.Schema({ 

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  challenge: {
    type: mongoose.Schema.Types.ObjectId, // which post this challenge belongs to 
    ref: 'Challenge',
    required: true,
    index: true,
  },

  dayNumber: {
    type: Number,
    required: true,
    min: [1, 'Choose which day of the challenge this post is for'],
  },

  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    maxlength: [120, 'Title must be 120 characters or less'],
  },

  caption: {
    type: String,
    trim: true,
    maxlength: 10000,
    default: '',
  },

  mediaUrls: {
    type: [String],
    default: [],
  }, //array of strings for images/videos
  
  platform: {
    type: String,
    enum: ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Threads', 'X', 'Facebook'],
    required: true,
  },

  contentType: {
    type: String,
    enum: ['Reel', 'Carousel', 'Story', 'Long-form video', 'Text post', 'Thread'],
    required: true,
  },

  scheduledDate: {
    type: Date,
    required: true,
  },

  postTime: {
    type: String,
    default: '',
    match: [/^$|^([01]\d|2[0-3]):[0-5]\d$/, 'Post time must look like 09:00 or 18:30'],
  },

  status: {
    type: String,
    enum: ['idea', 'draft', 'writing', 'editing', 'filming', 'scheduled', 'posted', ],
    default: 'idea',
  },

  link: {
    type: String,
    trim: true,
    default: '',
    match: [/^$|^https:\/\/\S+$/, 'Link must start with https://'],
  },

 
  
  postedAt: {
    type: Date,
    default: null,
  },

  },
 { timestamps: true }

);

postSchema.index({ challenge: 1, dayNumber: 1, postTime: 1 }); // we want one day to be able to have more than 1 post

postSchema.pre('save', function () {
  if (!this.isModified('status')) return;
  
  if (this.status === 'posted' && !this.postedAT) {
    this.postedAt = new Date();
  } else if (this.status !== 'posted') {
    this.postedAt = null;
  }
});

module.exports = mongoose.model('Post', postSchema);