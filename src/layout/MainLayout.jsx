import React from 'react'
import NavBar from '../components/shared/NavBar/NavBar'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <div> 
        <NavBar></NavBar>
       <Outlet> </Outlet>
        </div>
  )
}
