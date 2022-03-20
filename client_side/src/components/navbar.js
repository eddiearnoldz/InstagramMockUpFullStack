import React, {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../App'


const NavBar= ()=> {
  const {state, dispatch} = useContext(UserContext)
  const navigate = useNavigate()
  const renderList = () =>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">Create Post</Link></li>,
        <li>
           <button className="btn waves-effect waves-light #f50057 pink accent-3"
       onClick={()=>{
         localStorage.clear()
         dispatch({type:"CLEAR"})
         navigate('/signin')
       }}
       >
       Log Out
        </button>
        </li>
      ]
    }else {
        return [
          <li><Link to="/signin">Login</Link></li>,
          <li><Link to="/signup">Sign up</Link></li>
        ]
    }
}
  return(
  <nav>
  <div className="nav-wrapper">
    <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
    <ul id="nav-mobile" className="right">
        {renderList()}
    </ul>
  </div>
</nav>  
  )
}

export default NavBar