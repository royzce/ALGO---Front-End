import { http } from "./http";

export function register(user) {
  return http.post(`/users`, { user });
}
