import { http } from "./http";

// TEST FUNCTION ONLY
export function getFriends() {
  return http.get("/users");
}

// import { http } from "./http";

export function register(user) {
  return http.post(`/users`, { user });
}
// TEST FUNCTION ONLY
export function getCurrentUser() {
  return http.get("/profiles/zandor");
}
