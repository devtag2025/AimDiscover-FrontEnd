import AxiosInstance from "@/axios/axiosInstance";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";

const handleLogout = async(router)=>{

    try {
       await AxiosInstance.post('/auth/logout' , {}, {withCredentials:true})
       useAuthStore.getState().resetAuth();
       localStorage.clear("token")
       router.push('/') 
    } catch (error) { 
        toast.error('Logout Failed',error)
        console.error('Logout Failed',error);
    }
}

export default handleLogout;