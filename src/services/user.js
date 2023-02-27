import { http } from "./http";

export function getCurrentUser() {
  return http.get("/users/me");
}

// TEST FUNCTION ONLY
export function getFriends() {
  return http.get("/users");
}

export function register(user) {
  return http.post(`/users`, { user });
}
