import { profileService } from "@/services/profileService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export function useProfile() {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: profileService.getProfile,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      console.log(message, "message");
      toast.success(message || "Profile fetched Successfully");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Fetching Profile Failed.");
      console.error("Fetching Profile failed:", message);
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return profileService.updateProfile(data);
    },

    onSuccess: (response) => {
      const { message } = handleResponse(response);
      console.log("✅ [useUpdateProfile] Extracted message:", message);

      toast.success(message || "Profile Updated Successfully!");

      queryClient.invalidateQueries(["profile"]);
    },

    onError: (error) => {
      const message = handleError(error);
      console.error("❌ [useUpdateProfile] Handled error message:", message);

      toast.error(message || "Profile Update failed.");
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: profileService.changePassword,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      toast.success(message || "Password Change successfully!");
    },

    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Password Change failed.");
      console.error("Password Change failed:", message);
    },
  });
}
