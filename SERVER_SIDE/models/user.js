const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type:String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers:[{
    type:ObjectId,
    ref:"User"
  }],
  following:[{
    type:ObjectId,
    ref:"User"
  }],
  pic:{
    type: String,
    default: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
  }
})

mongoose.model("User",userSchema)