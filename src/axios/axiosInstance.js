import axios from "axios";

//Axios Instance will take 3 params

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1',
  timeout: 40000,
  withCredentials:true,
  headers: {
    "Content-Type": "application/json",
  },
  
}
);
console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
//AxiosInstance.interceptors.req.use take 2 things
//config ==> In config we have to get the token from localStoraage and se it in the header to send to server
//error ==> If some error occured in the config
//      Simple structute ==>Axios.interceptors.requrest.use(
//     (config)=>{},
//     (error)=>{}
//                )

AxiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} → ${config.url}`);
    return config;
  },

  (error) => {
    console.error("Request Error", error);
    return Promise.reject(error);
  }
);

//AxiosInstance.interceptors.req.use take 2 things
//response => to see the response
//error ==> If some error occured in the config
//      Simple structute ==>Axios.interceptors.response.use(
//     (response)=>{},
//     (error)=>{}
//                )

AxiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[response]`, response.status, response.data);
    return response;
  },
  (error) => {
    console.log(error)
    if (error.response) {
      console.error(
        "❌ Response Error:",
        error.response.status,
        error.response.data
      );

      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } else if (error.request) {
      console.error(" No Response from Server:", error.request);
    } else {
      console.error("Axios Setup Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
