import { http } from "./http";

export function getCurrentUser() {
  return http.get("/users/me");
}

// TEST FUNCTION ONLY
export function getFriends() {
  return http.get("/friends");
}

export function addFriend(friendId, date) {
  console.log("Pass Here", friendId, date);
  return http.post("/friends/add", { friendId, date });
}

export function getFriendRequest() {
  return http.get("/friends/request");
}

export function acceptRequest(friendId) {
  return http.post("/friends/accept", { friendId });
}

export function rejectRequest(friendId) {
  return http.delete("/friends/reject", { friendId });
}

export function removeFriend(friendId) {
  return http.post("/friends/delete", { friendId });
}

export function getProfileData(username) {
  return http.get(`/profiles/${username}`);
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
