import React, { createContext, useContext, useState } from 'react'
import { ClientApi } from '../servicesApi/ClientApi'
import { useNavigate } from 'react-router-dom'


export const stateContext = createContext({
    user:{},
    setUser:() => {},
    logout:()=>{},
    authenticated:false,
    login:(email,password)=>{},
    setauthenticated:()=>{},
    setToken:()=>{},
    resetPassword: (email) => {} ,
    updatePassword:(email, token, password, password_confirmation)=>{}

})

export default function UserContext({children}) {
    // const navigate = useNavigate()
    const [user,setUser] = useState({
        
    })
    const [authenticated,_setauthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'))
    const logout = ()=>{
        setUser({})
        setauthenticated(false)
    }
    
    const setauthenticated = (isAuthenticated) =>{
        _setauthenticated(isAuthenticated)
        window.localStorage.setItem('AUTHENTICATED',isAuthenticated)
    }

    const setToken = (token) =>{
      window.localStorage.setItem('token',token)
    }


    const login = async (email,password)=>{
    //    await ClientApi.getCsrfToken()
        return await ClientApi.login(email,password)
    }

const resetPassword = async (email) => {
  try {
    const message = await ClientApi.resetPassword(email);
    return message;
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe", error);
    return "Erreur lors de la réinitialisation du mot de passe.";
  }
}
const updatePassword = async ({ email, token, password, password_confirmation }) => {
    try {
        if (!email || !token || !password || !password_confirmation) {
            throw new Error("Tous les champs doivent être remplis.");
        }

        const response = await ClientApi.updatePassword({ email, token, password, password_confirmation });

        return response?.message || "Mot de passe mis à jour avec succès.";
    } catch (error) {
        console.error("Erreur complète :", error);

        // 🔎 Détail de l'erreur Laravel (important pour un 422)
        if (error.response?.data?.errors) {
            console.error("Erreurs Laravel :", error.response.data.errors);
        }

        const message = error.response?.data?.message || "Erreur lors de la mise à jour du mot de passe.";
        throw new Error(message);
    }
};




  return (
    <div>

        <stateContext.Provider value={{
            user,
            login,
            logout,
            authenticated,
            setauthenticated,
            setUser,
            setToken,
            resetPassword,
            updatePassword
            


        }} >
            {children}

        </stateContext.Provider>
    </div>
  )
}
export const useUserContext = ()=> useContext(stateContext)

