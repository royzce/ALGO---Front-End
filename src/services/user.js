import { http } from "./http";

// TEST FUNCTION ONLY
export function getFriends() {
  return http.get("/users");
}

// import { http } from "./http";

export function register(user) {
  return http.post(`/users`, {
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    avatar: user.avatar ? user.avatar : "",
  });
}
// TEST FUNCTION ONLY
export function getCurrentUser() {
  return http.get("/users/me");
}

export function getUsers() {
  return http.get("/users");
}
