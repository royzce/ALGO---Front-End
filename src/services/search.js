import { http } from "./http";

export function getUsersBy(name) {
  return http.get(`/users/search/${name}`);
}
