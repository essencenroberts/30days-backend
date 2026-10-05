//import
const mongoose = require('mongoose');

 // connect to mongobb
 async function connectDB() {
  try {
    const URI = process.env.MONGO_URI;

    await mongoose.connect(URI)

    console.log('Successfully conneted to MongoDB');
    
  } catch (error) {
    console.error('Databse connection error', err);
    
    process.exit(1);
  }
 }

 module.exports = connectDB