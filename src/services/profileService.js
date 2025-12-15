import api from "@/lib/api";

export const profileService = {
  getProfile:()=>api.get('/auth/profile'),
  updateProfile:()=>api.put('/auth/profile'),
  changePassword:()=>api.post('/auth/change-password')
}