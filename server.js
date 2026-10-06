require('dotenv').config();

// dependencies
const express = require('express')
const cors = reuire('cors');
const connectDB = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT
// const URI = process.env.MONGO_URI
// const authRoutes = require('./utils/authentication.js');

//mongoDB connection (database)
connectDB();

// middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send("Backend is running!")
}); //default route

// port
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
  
})