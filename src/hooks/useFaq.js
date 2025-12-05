import { faqService } from "@/services/faqService";
import toast from "react-hot-toast";
import { handleResponse } from "@/utils/handleResponse";
import { handleError } from "@/utils/handleError";
import { useQuery } from "@tanstack/react-query";

export function useAllFaqs (){
   return useQuery({
    queryKey:["All-Faqs"],
    queryFn:faqService.getFaq,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      console.log(message , "message")
      toast.success(message || "Faqs fetched Successfully");
      return response.data.data;
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Fetching Faqs Failed.");
      console.error("Fetching Faqs failed:", message);
    },
})
}