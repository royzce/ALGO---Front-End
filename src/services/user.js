import { http } from "./http";

// TEST FUNCTION ONLY
export function getFriends() {
  return http.get("/users");
}

// TEST FUNCTION ONLY
export function getCurrentUser() {
  return http.get("/users/3");
}
