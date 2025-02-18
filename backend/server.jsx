const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const cors = require('cors');

app.use(cors());

// Import routes
const userRoute = require('./routes/userRoute.jsx');

app.use(express.json());


// Connect to MongoDB
mongoose
.connect(process.env.URI)
.then(() => {
  console.log('MongoDB Connected...');
  app.listen(process.env.PORT || 5000, (err) => {
    if(err) console.log(err);
    console.log(`Server running on port ${process.env.PORT}`);
    
  });
})
.catch((err) => 
  {
    console.log("error",err)
  });

  // Use routes
  app.use(userRoute);

  