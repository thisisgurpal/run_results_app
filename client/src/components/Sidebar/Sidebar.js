import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SideBtnWrap, SidebarLink, SidebarRoute } from './SidebarElements'

const Sidebar = ({ isOpen, toggle}) => {
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
                    <SidebarLink to="/profile" onClick={toggle}>Profile</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to='/login'>Login</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar