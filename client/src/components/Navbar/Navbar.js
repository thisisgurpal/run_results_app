import React, { useState, useEffect } from "react"
import { userIsAuthenticated, getTokenFromLocalStorage } from '../helper/auth'
import { 
    Nav, 
    NavLink, 
    Bars, 
    NavMenu, 
    NavBtn,
    NavBtnLink
} from './NavbarElements'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const Navbar = ({ toggle }) => {

    const navigate = useNavigate()
    const [ userId, setUserId] = useState()

    const handleLogout = (e) => {
        e.preventDefault()
        // Remove token
        window.localStorage.removeItem('tinyhabits-token')
        // Redirect to the home page
        navigate('/')
      }


      useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/auth/profile/`,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }
      })
      console.log(data.id)
      setUserId(data.id)
    }
    getData()
  }, [])

    return (
        <Nav>
            <NavLink to="/">
                <h1>RunnersUniverse</h1>
            </NavLink>
            <Bars onClick={toggle}/>
            <NavMenu>
                <NavLink to="/events" activestyle="true">
                    Events
                </NavLink>
                <NavLink to="/training" activestyle="true">
                    Training & Nutrition
                </NavLink>
                <NavLink to="/events-for-you" activestyle="true">
                    Marathons For You
                </NavLink>
                {userIsAuthenticated() ? 
                <NavLink to={`/profile/${userId}`} activestyle="true">
                    Profile
                </NavLink>
            :
            ''
            }
            </NavMenu>
            {userIsAuthenticated() ? 
            <NavBtn>
                <NavBtnLink to='/' onClick={handleLogout}>Logout</NavBtnLink>
            </NavBtn>
            :
            <NavBtn>
                <NavBtnLink to='/login'>Login</NavBtnLink>
                <NavBtnLink to='/register'>Register</NavBtnLink>
            </NavBtn>
            }
        </Nav>
    )
}

export default Navbar