import { axiosClient } from "../Api/axios";


const ColierApi = {

    create:async (payload)=>{
        return await axiosClient.post('/client/colier-electroniques', payload);
    },

    all:async()=>{
        return await axiosClient.get('/client/colier-electroniques')
    },
    allFacteur:async()=>{
        return await axiosClient.get('/facteur/colier-electroniques')
    },
    allImpriment:async()=>{
        return await axiosClient.get('/impriment/colier-electroniques')
    },
    allAdmin:async()=>{
        return await axiosClient.get('/admin/colier-electroniques')
    },


}
export default ColierApi