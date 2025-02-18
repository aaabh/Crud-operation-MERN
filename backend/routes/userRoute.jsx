const express = require('express');
const router = express.Router();
const User = require("../models/userModel.jsx");



//Creates
router.post("/", async (req, res) => {
  console.log(req.body);
  
  const { name, email, age } = req.body;
  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    })
    res.status(201).json(userAdded);
    
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
})
//Reads GET
router.get("/" ,async (req, res) => {
  try {
  const showAll =await User.find();
  res.status(200).json(showAll);
} catch (error) {
  console.log(error);
  res.status(500).json({ error: error.message });
}
});



//get single user
router.get('/:id',async (req, res)=>{
  const {id} = req.params;

  try{
    const singleUser = await User.findById({_id : id});
    res.status(200).json(singleUser);
  }
  catch(error){
    console.log(error);
    res.status(500).json({ error: error.message})
    
  }
});

//detele user

router.delete('/:id', async (req, res) =>{
  try{
    const {id} = req.params;
    const deleteUser = await User.findByIdAndDelete({_id : id});
    res.status(200).json(deleteUser);
  }
  catch(error){
    console.log(error);
    res.status(400).json({error: error.message});
  }
});


//update user by patch/put
router.patch('/:id', async (req, res) =>{
  try{
    const {id} = req.params;
    console.log("get body",req.body);
    console.log("get id",id);
    
    
    const {name, email, age} = req.body;
    const updateUser = await User.findByIdAndUpdate(id, req.body,
    {
      new:  true,
    });
    res.status(203).json(updateUser);
  }
  catch(error){
    console.log(error);
    res.status(405).json({error: error.message});
  }
});

module.exports = router;