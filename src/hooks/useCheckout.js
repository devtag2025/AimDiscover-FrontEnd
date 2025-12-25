import { handleResponse } from "@/utils/handleResponse";
import { handleError } from "@/utils/handleError";
import { useMutation } from "@tanstack/react-query";
import { billingService } from "@/services/checkoutService";
import toast from "react-hot-toast"
export function useCheckout() {
  return useMutation({
    mutationFn: billingService.checkout,

    onSuccess: (response) => {
      const { message, data } = handleResponse(response);

      toast.success(message || "Redirecting to checkout...");

      if (data?.checkout_url) {
        window.location.href = data.checkout_url;
      }
    },

    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Checkout Failed.");
      console.error("Checkout failed:", message);
    },
  });
}
