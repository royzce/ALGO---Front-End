import axios from "axios";

export const http = axios.create({
  // temporary use of JSON-server
  // baseURL: "http://localhost:3001",

  // use this when switching to NestJs
  baseURL: "http://localhost:3001/api",
});

http.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("inside interceptor");
    alert("An unexpected error occurred");
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
