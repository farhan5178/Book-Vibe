import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Router, RouterProvider, } from 'react-router'
import { Routes } from './routs/Routes'





createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={Routes}></RouterProvider>
  </StrictMode>,
)
