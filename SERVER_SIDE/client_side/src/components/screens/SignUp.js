import React,{useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import M from 'materialize-css'

const SignUp = () => {
  const navigation = useNavigate()
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined)

useEffect(()=>{
  if(url){
    uploadField()
  }
},[url])
  const uploadPic = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "instagram-mockup")
    data.append("cloud_name", "eddiecloudarnold")

    fetch("https://api.cloudinary.com/v1_1/eddiecloudarnold/image/upload", {
      method: "post",
      body: data 
    })
    .then(res=>res.json())
    .then(data=>{
      setUrl(data.url)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  const uploadField = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "invalid email", classes: '#d32f2f red darken-2'})
      return
    }
    fetch("/signup",{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name,
          password,
          email,
          pic: url
        })
      }).then(res=>res.json())
      .then(data=>{
       if(data.error){
        M.toast({html: data.error, classes: '#d32f2f red darken-2'})
       } else {
         M.toast({html:data.message, classes: '#536dfe indigo accent-2'})
         navigation('/signin')
       } 
      }).catch(err=>{
        console.log(err)
      })
  }
  const postdata = () => {
    if(image){
      uploadPic()
    }else{
      uploadField()
    }
  }
  return (
   <div>
     <div className="mycard">
       <div className="card auth-card input-field">
       <h2>Instagram</h2>
       <input
       type="text"
       placeholder="name"
       value={name}
       onChange={(e)=>setName(e.target.value)}
       />
       <input
       type="text"
       placeholder="email"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       />
       <input
       type="password"
       placeholder="password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       />
          <div className="file-field input-field">
      <div className="btn #1976d2 blue darken-2">
        <span>Upload Profile Pic</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
      </div>
       <button className="btn waves-effect waves-light #1976d2 blue darken-2"
       onClick={()=>postdata()}
       >
       Sign Up
        </button>
        <h5>
          <Link to="/signin">Already have an account?</Link>
        </h5>
       </div>
      </div>
   </div>
  )
}
export default SignUp