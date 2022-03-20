import React from 'react'
import Navbar from './components/navbar'
import "./App.css"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import SignIn from './components/screens/SignIn'
import SignUp from './components/screens/SignUp'
import CreatePost from './components/screens/CreatePost'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;