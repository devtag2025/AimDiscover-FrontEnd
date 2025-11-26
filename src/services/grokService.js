import api from "@/lib/api";

export const GrokService = {
    getGrokAnalysis : ()=>api.get('/grok')
}