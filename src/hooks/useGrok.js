import { GrokService } from "@/services/grokService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useGetAnalytics(){
return useQuery({
    queryKey:["grok-analytics"],
    queryFn:GrokService.getGrokAnalysis,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      console.log(message , "message")
      toast.success(message || "Analytics fetched Successfully");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Fetching Analytics Failed.");
      console.error("Fetching Analytics failed:", message);
    },
})
}

