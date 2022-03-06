import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import Home from './components/Home'
import Events from './components/Events/Events.js'
import Navbar from './components/Navbar/Navbar'
import UserProfile from './components/Profiles/UserProfile'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Parallax pages={2} style={{ top: '100', left: '0' }}>
  <ParallaxLayer
    offset={0}
    speed={2.5}>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  </ParallaxLayer>

  <ParallaxLayer offset={1} speed={2} style={{ backgroundColor: '#ff6d6d' }} />

  <ParallaxLayer
    offset={1}
    speed={0.5}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    }}>
    <p>Scroll up</p>
  </ParallaxLayer>
</Parallax>
    </BrowserRouter>
  )
}

export default App
