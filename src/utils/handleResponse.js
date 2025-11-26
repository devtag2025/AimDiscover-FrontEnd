// Normalize the backend ApiResponse structure
export const handleResponse = (response) => {
    console.log("response from data",response);
    
  if (!response) return { message: "No response from server", data: null };

  const { statusCode, message, data, success } = response.data || {};
     
  return {
    statusCode,
    message: message || (success ? "Success" : "Something went wrong"),
    data: data || null,
    success,
  };
};
