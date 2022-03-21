import React,{useState, useEffect, useContext} from 'react'
import {UserContext} from '../../App'
import { Link } from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState([])
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    fetch("/allposts",{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
      .then(result=>{
        console.log(result)
      setData(result.posts)
    })
  }, [])
  const likePost = (id) => {
    fetch('/like', {
      method:"put",
      headers:{
        'Content-Type': "application/json",
        "Authorization": "Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result)
      const newData = data.map(item=>{
        if(item._id==result._id){
          return result
        }else {
          return item
        }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err)
    })
  }
  const unLikePost = (id) => {
    fetch('/unlike', {
      method:"put",
      headers:{
        'Content-Type': "application/json",
        "Authorization": "Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      const newData = data.map(item=>{
        if(item._id==result._id){
          return result
        }else {
          return item
        }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err)
    })
  }

  const makeComment = (text, postId) => {
    fetch('/comment', {
      method:'put',
      headers:{
        'Content-Type': "application/json",
        "Authorization": "Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId,
        text
      })
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result)
      const newData = data.map(item=>{
        if(item._id==result._id){
          return result
        }else {
          return item
        }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err)
    })
  }

  const deletePost = (postid) => {
    fetch(`/delete/${postid}`,{
      method:'delete',
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
      .then(result=>{
        console.log(result)
        const newData= data.filter(item=>{
          return item._id !== result._id
        })
        setData(newData)
      })
  }
  return (
    <div className="home">
      {
        data.map(item=>{
          return(
              <div className="card home-card" key={item._id}>
                <h5 style={{padding:"8px"}}><Link to={item.postedBy._id===state._id? "/profile" : "/profile/"+ item.postedBy._id}>{item.postedBy.name}</Link> 
                {item.postedBy._id===state._id
                && <i className="material-icons"
                style={{float:"right"}}
                onClick={()=>{deletePost(item._id)}}
                >delete</i>
                } <img src={item.postedBy.pic} style={{width:"30px", borderRadius:"15px"}}/></h5>
               
                <div className="card-image">
                  <img src={item.photo}/>
                </div>
                <div className="card-contet">
                  <i className="material-icons" style={{color:"red"}}>favorite</i>
                  {item.like.includes(state._id)
                  ?  <i className="material-icons" 
                    onClick={()=>{unLikePost(item._id)}}
                    >thumb_down</i>
                  :
                    <i className="material-icons"
                    onClick={()=>{likePost(item._id)}}
                    >thumb_up</i>
                  }
                
                  <h6>{item.like.length} likes </h6>
                  <h6>{item.title}</h6>
                  <p>{item.body}</p>
                  {
                    item.comments.map(comment=>{
                      return (
                        <h6 key={comment._id}><span style={{fontWeight:"500"}}>{comment.postedBy.name}</span> {comment.text}</h6>
                      )
                    })
                  }
                  <form onSubmit={(e)=>{
                    e.preventDefault()
                    makeComment(e.target[0].value, item._id)
                  }}>
                  <input type="text" placeholder="add a comment"/>
                  </form>
                
                </div>
              </div>
          )
        })
      }
    </div>
  )
}
export default Home;