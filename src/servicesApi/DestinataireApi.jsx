import { axiosClient } from "../Api/axios";


const DestinataireApi = {

    create:async (payload)=>{
        return await axiosClient.post('/client/destinataire', payload);
    },
 
    all:async()=>{
        return await axiosClient.get('/client/destinataire')
    },
    allFacteur:async()=>{
        return await axiosClient.get('/facteur/destinataire')
    },
      allImpriment:async()=>{
        return await axiosClient.get('/impriment/destinataire')
    },
        allAdmin:async()=>{
        return await axiosClient.get('/admin/destinataire')
    },

}
export default DestinataireApi