import React from "react"
import { userIsAuthenticated } from '../helper/auth'
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

const Navbar = () => {

    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault()
        // Remove token
        window.localStorage.removeItem('tinyhabits-token')
        // Redirect to the home page
        navigate('/')
      }

      const gotToUserProfile = (e) => {
        e.preventDefault()
        const getProfileId = async () => {
          try {
            const token = localStorage.getItem('tinyhabits-token')
            console.log(token)
            const { data } = await axios.get('/api/auth/profile', {
              'headers': {
                'Authorization': 'Bearer ' + token
              }
            })
            console.log('data', data)
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
            <Bars />
            <NavMenu>
                <NavLink to="/events" activestyle="true">
                    Events
                </NavLink>
                <NavLink to="/training" activestyle="true">
                    Training & Nutrition
                </NavLink>
                <NavLink to="/events-for-you" activestyle="true">
                    Events For You
                </NavLink>
                {userIsAuthenticated() ? 
                <NavLink to="/profile" onClick={gotToUserProfile} activestyle="true">
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