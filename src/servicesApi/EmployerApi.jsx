import { axiosClient } from "../Api/axios";

const EmployerApi = {

    create:async (payload)=>{
        return await axiosClient.post('/admin/employers', payload);
    },
    all:async ()=>{
        return await axiosClient.get('/admin/employers');
    },
    delete:async (id)=>{
        return await axiosClient.delete(`/admin/employers/${id}`);
    },
    update: async (id, payload) => {
        return await axiosClient.put(`/admin/employers/${id}`, {...payload,id});
      }
}

export default EmployerApi