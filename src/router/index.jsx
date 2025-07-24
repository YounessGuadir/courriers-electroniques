import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import GuestLayout from "../Layout/GuestLayout";
import ClientLayout from "../Layout/ClientLayout";
import ClientDashbord from "../Dachbord/ClientDashbord";
import AdminDashbord from "../Dachbord/AdminDashbord";
import AdminLayout from "../Layout/AdminLayout";
import EmployerLayout from "../Layout/EmployerLayout";
import EmployerDashbord from "../Dachbord/EmployerDashbord";
import CreateEmployer from "../Admin/createEmployer";
import { AjouterEmployer } from "../Admin/AjouterEmployer";
import CreateClient from "../Admin/Client/CreateEmployer";
import FacteurLayout from "../Layout/FacteurLayout";
import FacteurDashbord from "../Dachbord/FacteurDashbord";
import CreateFacteur from "../Admin/Facteur/CreateFacteur";
import Layout from "../Layout/Layout";
import CreateColierElectrinique from "../Client-Colient/CreateColierElectronique";
import AfficherColierElectronique from "../Client-Colient/AficherClier";
import Note_fount from "../pages/Note_fount";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ForgotPassword from "../pages/Login/ForgotPassword";
import ResetPassword from "../pages/Login/ResetPassword";
import PagePdf from "../pages/pagePdf/PagePdf";
import CreateImpriment from "../Admin/Impriment/CreateImpriment";
import ImprimentLayout from "../Layout/ImprimentLayout";
import ImprimentDashbord from "../Dachbord/ImprimentDashbord";
import AfficherFacteurColier from "../Client-Colient/AffichierFacteurColier";
import AfficherImprimentColier from "../Client-Colient/AffichierImprimentColier";
import Table from "../pages/table";
import AfficherAdminColier from "../Client-Colient/AffichierAdminColier";

//role
export const redirectToDachbord = (roleType) => {
    switch (roleType) {
      case 'client':
        return CLIENT_DACHBORD_ROUTE;
      
      case 'admin':
        return ADMIN_DACHBORD_ROUTE;
      
      case 'employer':
        return EMPLOYER_DACHBORD_ROUTE;
      case 'facteur':
        return FACTEUR_DACHBORD_ROUTE;
      case 'impriment':
        return IMPRIMENT_DACHBORD_ROUTE;
      default:
        console.warn('Role non reconnu ou manquant:', roleType);
        return LOGIN_ROUTE; // Redirige vers la page de connexion par défaut si le rôle est invalide
    }
  }


// {client} Colier_electrinique---------
export const CLIENT_DACHBORD_ROUTE = '/client/dachbord'
const CLIENT_BASE_ROUTE = '/client'
export const CLIENT_MANEGE_COLIER_ROUTE = CLIENT_BASE_ROUTE+'/coler-electrinique'
export const CLIENT_AFFICHER_COLIER_ROUTE = CLIENT_BASE_ROUTE+'/coler-electrinique/afficher'


//admin maganment-------------
const ADMIN_BASE_ROUTE = '/admin'

export const ADMIN_DACHBORD_ROUTE  = ADMIN_BASE_ROUTE+'/dachbord'
export const ADMIN_MANEGE_EMPLOYER_ROUTE = ADMIN_BASE_ROUTE+'/manege-employer'
export const ADMIN_MANEGE_AJOUTER_EMPLOYER = ADMIN_BASE_ROUTE+'/create-employer'
export const ADMIN_MANEGE_CLIENT_ROUTE = ADMIN_BASE_ROUTE+'/manege-client'
export const ADMIN_MANEGE_FACTEUR_ROUTE = ADMIN_BASE_ROUTE+'/manege-facteur'
export const ADMIN_MANEGE_IMPRIMENT_ROUTE = ADMIN_BASE_ROUTE+'/manege-impriment'
export const Admin_AFFICHER_COLIER_ROUTE = ADMIN_BASE_ROUTE+'/coler-electrinique/afficher'


//login----------------------
export const LOGIN_ROUTE = '/login';
export const FORGOT_PASSWORD = '/forgot-password'
export const RESET_PASSWORD = '/password-reset/:token'

//employer--------------------
export const EMPLOYER_DACHBORD_ROUTE = '/employer/dachbord'

//facteur------------------
const FACTEUR_BASE_ROUTE = '/facteur'
export const FACTEUR_DACHBORD_ROUTE = '/facteur/dachbord'
export const FACTEUR_AFFICHER_COLIER_ROUTE = FACTEUR_BASE_ROUTE+'/coler-electrinique/afficher'

//impriment-------------------
const IMPRIMENT_BASE_ROUTE = '/impriment'

export const IMPRIMENT_DACHBORD_ROUTE = '/impriment/dachbord'
export const IMPRIMENT_AFFICHER_COLIER_ROUTE = IMPRIMENT_DACHBORD_ROUTE+'/coler-electrinique/afficher'



export const router = createBrowserRouter([
    
  
    
    {
          
        element:<GuestLayout/>,
        children:[
            {
                path:LOGIN_ROUTE ,
                element:<Login/>
            },
            {
                path:FORGOT_PASSWORD,
                element:<ForgotPassword/>
            },
               {
                path:RESET_PASSWORD,
                element:<ResetPassword/>
            },
        ]
    },
    {
        element:<ClientLayout/>,
        children:[
            {

                path:CLIENT_DACHBORD_ROUTE,
                element: <ClientDashbord/>
            },
            {
                path:CLIENT_MANEGE_COLIER_ROUTE,
                element:<CreateColierElectrinique/>
            },
            {
                path:CLIENT_AFFICHER_COLIER_ROUTE,
                element:<AfficherColierElectronique/>
            },
             {
                path:'/pdf',
                element:<PagePdf/>
            },
         

        ]
    },
    {
        element:<AdminLayout/>,
        children:[
            {
                path:ADMIN_DACHBORD_ROUTE,
                element:<AdminDashbord/>
            },

            {
                path:ADMIN_MANEGE_EMPLOYER_ROUTE,
                element:<CreateEmployer/>
            },
            {
                path:ADMIN_MANEGE_AJOUTER_EMPLOYER,
                element:<AjouterEmployer/>
            },
            {
                path:ADMIN_MANEGE_CLIENT_ROUTE,
                element:<CreateClient/>
            },
            {
                path:ADMIN_MANEGE_FACTEUR_ROUTE,
                element:<CreateFacteur/>
            },
            {
                path:ADMIN_MANEGE_IMPRIMENT_ROUTE,
                element:<CreateImpriment/>
            },
             {
                path:Admin_AFFICHER_COLIER_ROUTE,
                element:<AfficherAdminColier/>
            },
        

        ]
    },
    {
        element:<EmployerLayout/>,
        children:[
            {
                path:EMPLOYER_DACHBORD_ROUTE,
                element:<EmployerDashbord/>
            },
          
        ]
    },

    {
        element:<FacteurLayout/>,
        children:[
            {
                path:FACTEUR_DACHBORD_ROUTE,
                element:<FacteurDashbord/>
            },
              {
                path:FACTEUR_AFFICHER_COLIER_ROUTE,
                element:<AfficherFacteurColier/>
            },
          
        ]
    },
        {
        element:<ImprimentLayout/>,
        children:[
            {
                path:IMPRIMENT_DACHBORD_ROUTE,
                element:<ImprimentDashbord/>
            },
                {
                path:IMPRIMENT_AFFICHER_COLIER_ROUTE,
                element:<AfficherImprimentColier/>
            },
          
        ]
    },
    {
        element:<Layout/>,
        children:[
              {
                path:'/',
                element:<Home/>
            },
            {
                path:'/courriers-electroniques',
                element:<Home/>
            },
         
            {
                path:'/about',
                element:<About/>
            },
            {
                path:'/contact',
                element:<Contact/>
            },
               {
                path:'*',
                element:<Note_fount/>
            },
          
        
        ]
    },
      {
                path:'/table',
                element:<Table/>
            }

])