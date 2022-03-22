const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001
const mongoose = require('mongoose')
const { MONGOURI } = require('./config/keys')



mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.connection.on('connected', () =>{
  console.log("connected to mongo database")
  mongoose.connection.on('error', (err) => {
    console.log("database connection error", err)
  })
})

require('./models/user')
require('./models/post')

app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_END == "production"){
  app.use(express.static('client_side/build'))
  const path = require('path')
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}


app.listen(PORT, ()=> {
  console.log("server is up and running on port ", PORT)
})