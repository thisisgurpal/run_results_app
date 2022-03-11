import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SideBtnWrap, SidebarLink, SidebarRoute } from './SidebarElements'
import { getTokenFromLocalStorage, userIsAuthenticated } from '../helper/auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ isOpen, toggle}) => {

    const navigate = useNavigate()
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

      const handleLogout = (e) => {
        e.preventDefault()
        // Remove token
        window.localStorage.removeItem('token')
        // Redirect to the home page
        navigate('/')
      }

    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/events" onClick={toggle}>Events</SidebarLink>
                    <SidebarLink to="/training" onClick={toggle}>Training & Nutrition</SidebarLink>
                    <SidebarLink to="/events-for-you" onClick={toggle}>Events For You</SidebarLink>
                    {userIsAuthenticated() && <SideBtnWrap onClick={gotToUserProfile}>Profile</SideBtnWrap>}  
                </SidebarMenu>
                <SideBtnWrap>
                    {userIsAuthenticated() ?
                    <SidebarRoute to='/' onClick={handleLogout}>Logout</SidebarRoute>
                    :
                    <><SidebarRoute to='/login'>Login</SidebarRoute><SidebarRoute to='/register'>Register</SidebarRoute></>
                }
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar