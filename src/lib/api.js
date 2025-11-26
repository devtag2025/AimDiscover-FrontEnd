import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// =============================
// 🚀 Request Interceptor
// =============================
api.interceptors.request.use(
  (config) => {
    try {
      // ✅ If running in browser (not SSR)
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log(`[Request] ${config.method?.toUpperCase()} → ${config.url}`);
        } else {
          console.warn("⚠️ No token found in localStorage");
        }
      }
    } catch (error) {
      console.error("❌ Error attaching token:", error);
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// =============================
// 🧩 Response Interceptor
// =============================
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.get("/auth/refresh-token");
        const newAccessToken = data.data.accessToken;

        localStorage.setItem("token", newAccessToken);
        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest); 
      } catch (refreshError) {
        console.warn("Refresh token failed:", refreshError);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
