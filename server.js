require('dotenv').config();

// dependencies
const express = require('express')
const connectDB = require('./config/connection.js');
const app = express();
const PORT = process.env.PORT
const URI = process.env.MONGO_URI

//mongoDB connection (database)
connectDB();

// middleware

//routes
app.get('/', (req, res) => {
  res.send("This is the homepage!")
});

// port
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
  
})