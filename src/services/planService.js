import api from "@/lib/api";

export const PlanService = {
getPlans({ status }) {
  return api.get("/plans", {
    params: {
      status
    },
  });
},
}