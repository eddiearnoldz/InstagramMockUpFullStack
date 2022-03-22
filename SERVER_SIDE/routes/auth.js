const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys');
const requireLogin = require('../middleware/requireLogin')

router.get('/', (req, res) =>{
  res.send('Hello')
});

router.post('/signup', (req, res) => {
 const {name, email, password, pic}= req.body
 if(!email || !password|| !name){
  return res.status(422).json({error: "please add all the fields"})
 }
 User.findOne({email:email})
 .then((savedUser) => {
   if(savedUser){
    return res.status(422).json({error: "user already exists with that email"})
   }
   bcrypt.hash(password, 12)
   .then(hashedpassword=> {
      const user = new User({
        email,
        name,
        password: hashedpassword,
        pic
      })
      user.save() 
      .then(user=> {
      res.json({message:"saved succesfully"})
      }) 
      .catch(err=> {
        console.log(err)
      })
    })
 })
 .catch(err=>{
   console.log(err)
 })
})

router.post('/signin', (req, res)=> {
  const {email, password} = req.body
  if(!email || !password){
    res.status(422).json({error: 'please fill in all details'})
  }
  User.findOne({email:email})
  .then(savedUser=>{
    if(!savedUser){
      return res.status(422).json({error: "invalid email or password"})
    }
    bcrypt.compare(password, savedUser.password)
    .then(doMatch=>{
      if(doMatch){
        // res.json({message: "successfuly signed in"})
        const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
        const {_id, name, email, followers, following, pic} = savedUser
        res.json({token:token, user:{_id, name, email, followers, following, pic}})
      }
      else{
        return res.status(422).json({error: "invalid email or password"})
      }
    })
    .catch(err=>{
      console.log(err)
    })
  })
})

module.exports = router
