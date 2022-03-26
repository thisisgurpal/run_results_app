import React, { useState, useEffect } from "react"
import { userIsAuthenticated, getTokenFromLocalStorage } from '../helper/auth'
import { 
    Nav, 
    NavLink, 
    Bars, 
    NavMenu, 
    NavBtn,
    NavBtnLink,
    NavBtn2
} from './NavbarElements'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const Navbar = ({ toggle }) => {

    const navigate = useNavigate()
    const [ userId, setUserId] = useState()

    const handleLogout = (e) => {
        e.preventDefault()
        // Remove token
        window.localStorage.removeItem('token')
        // Redirect to the home page
        navigate('/')
      }


      const gotToUserProfile = (e) => {
        e.preventDefault()
        const getProfileId = async () => {
          try {
            const { data } = await axios.get('/api/auth/profile/', {
                headers: {
                  Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                }
              })
            console.log('data', data.id)
            navigate(`/profile/${data.id}`)
            //  setUserProfileId(data.id)
          } catch (err) {
            console.log(err)
          }
        }
        getProfileId()
    
      }

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
                    Training & Health
                </NavLink>
                <NavLink to="/events-for-you" activestyle="true">
                    Marathons For You
                </NavLink>
                {userIsAuthenticated() && <NavBtn2 onClick={gotToUserProfile} activestyle="true">Profile</NavBtn2>}
            </NavMenu>
            {userIsAuthenticated() ? 
            <>
            <NavBtn>
                    <NavBtnLink to='/' onClick={handleLogout}>Logout</NavBtnLink>
                </NavBtn></>
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