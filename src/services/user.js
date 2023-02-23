import { http } from "./http";

// TEST FUNCTION ONLY
export function getFriends() {
  return http.get("/users");
}
