import api from "@/lib/api";

export const customerService ={
    sendSupportMail : (data) =>api.post('/support',data)
}