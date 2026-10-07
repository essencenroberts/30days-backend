require('dotenv').config();

// dependencies
const express = require('express')
const cors = require('cors');
const connectDB = require('./config/connection');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// all API routes
const apiRoutes = require('./routes/api');


const app = express();
const PORT = process.env.PORT || 3010;

// const URI = process.env.MONGO_URI
// const authRoutes = require('./utils/authentication.js');


//mongoDB connection (database)
connectDB();

// Global middleware (run on every request)
app.use(cors());
app.use(express.json());


//routes
app.get('/', (req,res) => {
  res.json({ message: '30Days Backend is running!' })
}
);

// app.get('/api/health', (req, res) => {
//   res.json( '30Days Backend is running!')
// }); //default route test to see if its running -- confirm

// every API route
app.use('/api', apiRoutes);

// Error handlers
app.use(notFound); // runs when a requested URL doesn't exist
app.use(errorHandler); // catches every error



// port
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
  
});