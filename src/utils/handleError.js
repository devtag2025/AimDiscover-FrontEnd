export const handleError = (error) => {
  if (error.response) {
    const { message } = error.response.data || {};
    return message || "An unexpected server error occurred.";
  }
  return error.message || "Network error — please try again.";
};
