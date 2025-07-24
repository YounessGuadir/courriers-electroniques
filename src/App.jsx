import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import UserContext from './Context/UserContext'
import { ThemeProvider } from "@/components/theme-provider"
// import { Toaster } from "@/components/ui/toaster"
import { Toaster } from 'sonner'



function App() {


  return (
    <>
    <UserContext>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router}/>
    <Toaster/>
 
    </ThemeProvider>
  
   
    </UserContext>
 
   
    </>
  )
}

export default App
