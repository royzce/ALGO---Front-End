import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:3001/api",
});

http.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("An unexpected error occurred");
  }

  return Promise.reject(error);
});

http.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    request.headers = { Authorization: `Bearer ${accessToken}` };
  }
  return request;
});
