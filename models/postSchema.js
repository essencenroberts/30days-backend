// import mongoose
const mongoose = require('mongoose');

// define schema for post input fields : include _id: ObjectId, dayNumber, scheduledDate, title, caption, platform, contentType, status, link, postedAt

const postSchema = new mongoose.Schema({ 
  _id: {
  
  },

  dayNumber: {
  
  },

  title: {
  
  },

  caption: {
    type: String,
    trime: true,
  },

  platform: {
    type: String,
    enum: ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Threads']
  },

  contenType: {
  
  },

  scheduledDate: {
  
  },

  status: {
  
  },

  link: {
  
  },

  postedAt: {
  
  },
 

})