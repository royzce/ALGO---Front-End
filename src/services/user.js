import { http } from "./http";

export function getCurrentUser() {
  return http.get("/users/me");
}

// TEST FUNCTION ONLY
export function getFriends() {
  return http.get("/friends");
}

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

export function getNotifications() {
  return http.get("/notifications");
}

export function updateNotif(notifId) {
  return http.put("/notifications/update", { notifId });
}

export function getUsers() {
  return http.get("/users");
}
