require('dotenv').config();

// dependencies
const express = require('express')
const cors = require('cors');
const connectDB = require('./config/connection');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3010;

// const URI = process.env.MONGO_URI
// const authRoutes = require('./utils/authentication.js');


//mongoDB connection (database)
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(notFound); // runs when a requested URL doesn't exist
app.use(errorHandler); // catches every error





//routes
app.get('/api/health', (req, res) => {
  res.json( '30Days Backend is running!')
}); //default route test to see if its running -- confirm

  // userRoutes

  // challengeRoutes

  // postRoutes






// port
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
  
})