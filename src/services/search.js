import { http } from "./http";

export function getUsersBy(name) {
  return http.get(`/users/search?q=${name}`);
}

export function getAllUser() {
  return http.get("/users/all");
}
