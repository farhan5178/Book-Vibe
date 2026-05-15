import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Routes } from './routs/Routes'
import BookProvider from './context/BookProvider'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookProvider>
       <RouterProvider router={Routes} />
       <ToastContainer 
         position="top-right"
         autoClose={3000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="colored"
         transition={Bounce}
       />
    </BookProvider>
  
  </StrictMode>,
)
