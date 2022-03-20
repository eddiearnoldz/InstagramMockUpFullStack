import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import M from 'materialize-css'

const SignUp = () => {
  const navigation = useNavigate()
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const postdata = () => {
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
          email
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
       type="text"
       placeholder="password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       />
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