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
import { Sidebar } from '../Administration/Saidbar'
import { ModeToggle } from '../components/mode-toggle'
import { CLIENT_DACHBORD_ROUTE, LOGIN_ROUTE, redirectToDachbord } from '../router'

export default function ClientLayout() {
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
          if(role !=='client'){
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
  if (isLoading) {
    return <></>; 
  }
  

  return (

    <div>
       
        <div>
             <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to={CLIENT_DACHBORD_ROUTE} className="flex items-center gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4b/GBAM_LOGO_%281%29.png"
                  alt="Logo"
                  className="h-8 w-auto"
                />
                <span className="font-semibold text-lg hidden sm:inline">Barid Al-Maghrib</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6">
                <Link 
                  to={CLIENT_DACHBORD_ROUTE} 
                  className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/projects" 
                  className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
                >
                  Projects
                </Link>
                <Link 
                  to="/settings" 
                  className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
                >
                  Settings
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <ModeToggle />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="relative h-8 w-8 rounded-full"
                  >
                    <span className="sr-only">Open menu</span>
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name} </p>
                      <p className="text-xs leading-none text-muted-foreground">Client</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={ClientLogout} className="text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                <div className={'border mr-2 rounded-l'}> <Sidebar/></div>
                <div className={'w-100 md:w-10/9 border  rounded-l'}>
                <Outlet/></div>
              </div>
            </div>

          </main>
          



           
           

        </div>


    </div>
  )
}
