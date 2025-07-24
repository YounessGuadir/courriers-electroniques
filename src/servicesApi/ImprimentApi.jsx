import { axiosClient } from "../Api/axios";


const ImprimentApi = {

    create:async (payload)=>{
        return await axiosClient.post('/admin/impriment', payload);
    },
     all:async()=>{
        return await axiosClient.get('/admin/impriment')
    },
      delete:async(id)=>{
        return await axiosClient.delete(`/admin/impriment/${id}`)
    },
    update: async (id, payload) => {
        return await axiosClient.put(`/admin/impriment/${id}`, {...payload,id});
      }

}
export default ImprimentApi