const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post")

router.post('/createpost', requireLogin, (req,res)=> {
  const {title, body} = req.body
  if(!title || !body ){
    res.status(422).json({error:"must include a title"})
  }
  req.user.password = undefined
  const post = new Post({
    title,
    body,
    postedBy:req.user,
  })
  post.save().then(result=>{
    res.json({post:result})
  })
  .catch(err=>{
    console.log(err)
  })
})

router.get('/allposts', requireLogin, (req, res)=> {
  Post.find()
  .populate("postedBy", "_id name")
  .then(posts=>{
    res.json({posts})
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/myposts', requireLogin, (req, res)=> {
  Post.find({postedBy: req.user._id})
  .populate("postedBy", "_id name")
  .then(myposts =>{
    res.json({myposts})
  })
  .catch(err=> {
    console.log(err)
  })
})

module.exports = router 