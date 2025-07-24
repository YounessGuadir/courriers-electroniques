import { axiosClient } from "../Api/axios";

export const ClientApi = {
    // getCsrfToken : async ()=>{
    //     return await axiosClient.get('sanctum/csrf-cookie',{
    //             baseURL : import.meta.env.VITE_BACKEND_URL
    //           });
    // },
    login :async (email,password)=>{
        return await axiosClient.post('/login', {email,password});
    },
    getuser :async ()=>{
        return await axiosClient.get('/me')
    },
    logout:async()=>{
        return await axiosClient.post('/logout')
    },
    create:async(payload)=>{
        return await axiosClient.post('/admin/clients',payload)
    },
    all:async()=>{
        return await axiosClient.get('/admin/clients')
    },
    delete:async (id)=>{
        return await axiosClient.delete(`/admin/clients/${id}`);
    },
    update: async (id, payload) => {
        return await axiosClient.put(`/admin/clients/${id}`, {...payload,id});
      },


    resetPassword: async (email) => {
  try {
    const response = await axiosClient.post('/forgot-password', { email });
    return response.data.message;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erreur lors de la réinitialisation du mot de passe';
    
    if (error.response?.status === 422) {
      throw new Error('L\'email fourni n\'est pas valide ou n\'est pas associé à un compte.');
    }
    
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
},
// ClientApi.jsx
updatePassword : async ({ email, token, password, password_confirmation }) => {
    try {
        const response = await axiosClient.post('/reset-password', {
            email,
            token,
            password,
            password_confirmation
        });

        // Retourne la réponse de succès du backend
        return response.data; // Assure-toi que le backend renvoie un message ou un code de succès.
    } catch (error) {
        console.error("Erreur lors de la mise à jour du mot de passe:", error);
        throw error;  // Relance l'erreur pour la gestion côté appelant
    }
}


    
}