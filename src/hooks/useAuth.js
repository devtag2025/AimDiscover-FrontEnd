import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/authService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";
export function useRegister() {
  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      toast.success(message || "Account created successfully!");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Signup failed.");
      console.error("Signup failed:", message);
    },
  });
}

export function useLogin() {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: AuthService.login,

    onSuccess: (response) => {
      const { data, message } = handleResponse(response);
      const token = data?.accessToken;

      if (token) {
        localStorage.setItem("token", token);
      }
      setAuth(true);
      toast.success(message || "Login successful!");
    },

    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Login failed.");
      console.error("Login failed:", message);
    },
  });
}
export function useForgotPassword() {
  return useMutation({
    mutationFn: AuthService.forgotPassword,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      toast.success(message || "Account created successfully!");
    },

    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Signup failed.");
      console.error("Signup failed:", message);
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: AuthService.resetPassword,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      toast.success(message || "Account created successfully!");
    },

    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Signup failed.");
      console.error("Signup failed:", message);
    },
  });
}


export function useGoogleAuth() {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      AuthService.googleRedirect();
    },

    onSuccess: () => {
      setAuth(true)
      toast.success("Redirecting to Google...");
    },

    onError: (error) => {
      toast.error("Google Sign-in failed. Try again.");
      console.error("Google Auth Error:", error);
    },
  });
}
