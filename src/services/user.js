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

// TEST FUNCTION ONLY
// export function getNotifications() {
//   return new Promise((resolve) => {
//     resolve({ data: NOTIFS });
//   });
// }

// TEST NOTIFS
export const NOTIFS = [
  {
    count: 2,
    type: "react",
    typeId: 9,
    isRead: false,
    userId: 1,
    date: "2023-02-23T02:53:57.200Z",
    user: {
      firstName: "Johnny",
      lastName: "Favorite",
      avatar:
        "https://i.pinimg.com/originals/f9/a0/b4/f9a0b4f86ab0226ec83dfff20c08ba78.jpg",
    },
  },
  {
    count: 12,
    type: "comment",
    typeId: 12,
    isRead: false,
    userId: 1,
    date: "2023-02-24T02:53:57.200Z",
    user: {
      firstName: "Johnny",
      lastName: "Favorite",
      avatar:
        "https://i.pinimg.com/originals/f9/a0/b4/f9a0b4f86ab0226ec83dfff20c08ba78.jpg",
    },
  },
  {
    count: 1,
    type: "tag",
    typeId: 1,
    isRead: true,
    userId: 1,
    date: "2023-02-15T02:53:57.200Z",
    user: {
      firstName: "Johnny",
      lastName: "Favorite",
      avatar:
        "https://i.pinimg.com/originals/f9/a0/b4/f9a0b4f86ab0226ec83dfff20c08ba78.jpg",
    },
  },
  {
    count: 6,
    type: "frequest",
    typeId: 1,
    isRead: false,
    userId: 1,
    date: "2023-02-26T02:53:57.200Z",
    user: {
      firstName: "Johnny",
      lastName: "Favorite",
      avatar:
        "https://i.pinimg.com/originals/f9/a0/b4/f9a0b4f86ab0226ec83dfff20c08ba78.jpg",
    },
  },
];
export function getUsers() {
  return http.get("/users");
}
