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
  Menu,
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
import { ADMIN_DACHBORD_ROUTE, LOGIN_ROUTE, redirectToDachbord } from '../router'

export default function AdminLayout() {
   const navigate = useNavigate()
   const [isLoading,setIsLoading] = useState(true)
  const {logout,setUser,user,setauthenticated,authenticated}= useUserContext()
  const ClientLogout = async () =>{
  
    ClientApi.logout().then(()=>{
    
     
       logout()
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
          if(role!=='admin'){
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


  return (

    <div>
       
        <div>
 <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Barid Al-Maghrib</span>
              </a>
              <div className="hidden md:flex items-center gap-6">
                <Link to="#" className="text-sm font-medium hover:text-primary">Services</Link>
                <Link to="#" className="text-sm font-medium hover:text-primary">Entreprises</Link>
                <Link to={'/about'} className="text-sm font-medium hover:text-primary">About</Link>
                <Link to={'/contact'} className="text-sm font-medium hover:text-primary">Contact</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-zinc-700 dark:text-white">
            <ModeToggle />
          </a>

          {/* User Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-zinc-700 dark:text-white">
                <User/>
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
        
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
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
                <div className={'border mr-2 rounded-l'}> <SidebarAdmin/></div>
                <div className={'w-100 md:w-10/9 border  rounded-l'}>
            
                <Outlet/></div>
              </div>
            </div>

          </main>
          



           
           

        </div>


    </div>
  )
}
