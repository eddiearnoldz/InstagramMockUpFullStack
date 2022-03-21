import React,{useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'

const Profile = () => {
  const [mypics, setPics] = useState([])
  const {state, dispatch} = useContext(UserContext)
  const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined)

  useEffect(()=>{
    fetch('/myposts',{
      headers:{
        "Authorization": "Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      setPics(result.myposts)
    })
  }, [])
  const updatePhoto = () => {
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
  return (
  <div style={{maxWidth: '550px', margin:"0px auto"}}>
    <div  style={{
      margin: '18px 0px',
      borderBottom:"1px solid grey"
    }}>

 
    <div style={{
      display: 'flex',
      justifyContent: 'space-around'
    }}>
      <div>
        <img style={{width: "160px", height:"160px", borderRadius:"80px"}}
        src={state? state.pic : "loading"}/>
      </div>
      <div>
        <h4>{state?state.name:"loading"}</h4>
        <h6>{state?state.email:"loading"}</h6>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '108%'}}>
        <h6>{mypics.length} posts</h6>
        <h6>{state?state.followers.length:"0"}followers</h6>
        <h6>{state?state.following.length:"0"} following</h6>
        </div>
      </div>
    </div>
    <div className="file-field input-field" style={{margin:"10px"}}>
      <div className="btn #1976d2 blue darken-2">
        <span>Update Pic</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
      </div>
  </div>
    <div className="gallery">
      {
        mypics.map(photo=>{
          return(
            <img key={photo._id} className="item" src ={photo.photo} alt={photo.title}/>
          )
        })
      }
    </div>
  </div> 
  )
}
export default Profile