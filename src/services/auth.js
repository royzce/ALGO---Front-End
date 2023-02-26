import { http } from "./http";

export function login(username, password) {
  return http.post("/auth", { username, password });
}

export function forgotPassord(email) {
  return http.post("/auth/forgot-password", { email });
}

export function resetPassword(token, password) {
  if (arguments.length === 1) {
    return http.post("/auth/reset-password", { token });
  } else {
    return http.post("/auth/reset-password", { token, password });
  }
}
