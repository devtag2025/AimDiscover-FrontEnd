import { PlanService } from "@/services/planService";
import { handleResponse } from "@/utils/handleResponse";
import { useQuery } from "@tanstack/react-query";
export function useGetPlans({ status = "active" }) {
  return useQuery({
    queryKey: ["plans", status],
    queryFn: async () => {
      const response = await PlanService.getPlans({
        status,
      });

      const { data } = handleResponse(response);

      return data;
    },
    keepPreviousData: true,
  });
}
