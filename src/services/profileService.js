import api from "@/lib/api";

export const profileService = {
  getProfile:()=>api.get('/auth/profile'),
  updateProfile:(data)=>api.put('/auth/profile',data),
  changePassword:(data)=>api.post('/auth/change-password',data)
}