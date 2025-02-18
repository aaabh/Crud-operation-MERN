const mongoose = require('mongoose');

//create Scheme
const userScheme = new mongoose.Schema(
  {
  name: {
    type: String,
    required: true,
  },
  email: {
    type:String,
    unique: true,
    required: true,
  },
  age:{
    type: Number,
  },
},{timestamps: true});

//create model from scheme
const User = mongoose.model('User', userScheme);

module.exports = User;