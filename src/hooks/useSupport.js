import { customerService } from "@/services/customerService";
import { handleResponse } from "@/utils/handleResponse";
import { handleError } from "@/utils/handleError";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSendMail(){
return useMutation({
    mutationFn:customerService.sendSupportMail,

    onSuccess: (response) => {
      const data = response?.data || response;
      const { message } = handleResponse(response);
      toast.success(message || "Mail send successfully!");

      return response;
    },

    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Mail not send");
      console.error("Mail Support failed:", message);
      throw error;
    },
  });
}