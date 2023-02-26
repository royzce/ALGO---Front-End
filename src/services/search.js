import { http } from "./http";

export function getUsersBy(name) {
  return http.get(`/profiles/search?q=${name}`);
}
