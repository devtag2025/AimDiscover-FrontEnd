import api from "@/lib/api";

export const faqService = {
    getFaq : () => api.get('/faq')
}