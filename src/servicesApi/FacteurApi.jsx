import { axiosClient } from "../Api/axios";


const FacteurApi = {

    create:async (payload)=>{
        return await axiosClient.post('/admin/facteurs', payload);
    },
    all:async()=>{
        return await axiosClient.get('/admin/facteurs')
    },
    delete:async(id)=>{
        return await axiosClient.delete(`/admin/facteurs/${id}`)
    },
    update: async (id, payload) => {
        return await axiosClient.put(`/admin/facteurs/${id}`, {...payload,id});
      },
          
      
      
    
}
export default FacteurApi