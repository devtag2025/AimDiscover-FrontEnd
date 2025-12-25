import api from "@/lib/api"

export const billingService = {
    checkout:(planId)=>api.post('/subscriptions/checkout',{planId})
}