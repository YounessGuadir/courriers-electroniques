import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { axiosClient } from '../Api/axios'
import { useUserContext } from '../Context/UserContext'
import { ClientApi } from '../servicesApi/ClientApi'
import { Button } from "@/components/ui/button";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
 
// import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ModeToggle } from '../components/mode-toggle'
import { SidebarAdmin } from '../Administration/SaidbarAdmin'
import { EMPLOYER_DACHBORD_ROUTE, LOGIN_ROUTE, redirectToDachbord } from '../router'
import { SidebarEmployer } from '../Administration/SaidbarEmployer'

export default function EmployerLayout() {
   const navigate = useNavigate()
   const [isLoading,setIsLoading] = useState(true)
  const {logout,setUser,user,setauthenticated,authenticated}= useUserContext()
  const ClientLogout = async () =>{
  
    ClientApi.logout().then(()=>{
       logout(),
       navigate(LOGIN_ROUTE)

    })

  }
  
  useEffect(() => {
     if (authenticated ) {
       setIsLoading(false)
       
       ClientApi.getuser()
         .then(({ data }) => {
           setUser(data)
           setauthenticated(true)
        
   
           const { role } = data
           if(role !=='employer'){
            navigate(redirectToDachbord(role))


           }
         
           
          
         })
         .catch(() => {
           logout()
            navigate(LOGIN_ROUTE)
         })
     } else {
      navigate(LOGIN_ROUTE)
    }
   }, [authenticated])
  if(isLoading){
    return <></>
  }


  return (

    <div>
       
        <div>
        <nav className="bg-white dark:bg-zinc-900 shadow-md border-b border-zinc-200 dark:border-zinc-800">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      
      {/* Logo */}
      <div className="flex items-center">
        <img
           src="https://upload.wikimedia.org/wikipedia/commons/4/4b/GBAM_LOGO_%281%29.png"
           alt="Logo"
           className="h-18 w-auto object-contain transition-transform transform hover:scale-105"
        />
      </div>
      
      {/* Menu Mobile Toggle */}
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
          </svg>
        </button>
      </div>
      
      {/* Menu Desktop */}
      <div className="hidden sm:flex items-center space-x-4">
        <Link to={EMPLOYER_DACHBORD_ROUTE} className="text-sm font-medium text-zinc-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-400">
          Dashboard
        </Link>
        <a href="/projects" className="text-sm font-medium text-zinc-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-400">
          Projects
        </a>
        <a href="/settings" className="text-sm font-medium text-zinc-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-400">
          Settings
        </a>
      </div>

      {/* Profile Dropdown */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:ml-6 sm:pr-0">
        <div className="flex items-center space-x-4">
          {/* Mode Toggle */}
          <a href="#" className="text-sm text-zinc-700 dark:text-white">
            <ModeToggle />
          </a>

          {/* User Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-zinc-700 dark:text-white">
                {user.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={ClientLogout}>
                  <LogOut className="mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </div>
</nav>
<hr />
        </div>
        <div>
          
          <main>
            <div  className='mx-auth px-10 space-y-4 py-4'>
              <div className='flex'>
                <div className={'border mr-2 rounded-l'}><SidebarEmployer/> </div>
                <div className={'w-100 md:w-10/9 border  rounded-l'}>
                <Outlet/></div>
              </div>
            </div>

          </main>
          



           
           

        </div>


    </div>
  )
}
