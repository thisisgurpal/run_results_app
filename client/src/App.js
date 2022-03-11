import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import Home from './components/Home'
import Events from './components/Events/Events.js'
import Navbar from './components/Navbar/Navbar'
import UserProfile from './components/Profiles/UserProfile'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import SingleEvent from './components/Events/SingleEvent'
import Training from './components/TrainingPlans/Training'
import EventsForYou from './components/Events/EventsForYou'
import Footer from './components/Footer'
import { Flex } from '@chakra-ui/react'
import ScrollToTop from './components/helper/ScrollToTop'
import Sidebar from './components/Sidebar/Sidebar'
import RunnerProfile from './components/Profiles/RunnerProfile'

const App = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <BrowserRouter>
    <Flex minHeight='100vh' direction='column' justifyContent='space-between'>
    <Sidebar isOpen={isOpen} toggle={toggle}/>
    <Navbar toggle={toggle}/>
    <ScrollToTop />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:eventId" element={<SingleEvent />} />
        <Route path="/training" element={<Training />} />
        <Route path="/events-for-you" element={<EventsForYou />} />
        <Route path="/runner/:runnerID" element={<RunnerProfile />} />
      </Routes>
      <Footer />
      </Flex>
      </BrowserRouter>
  )
}

export default App
