import { createContext, useEffect, useState } from "react";
import React from "react";
import * as userSvc from "../services/user";

export const UserContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
  allUsers: {},
});

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      userSvc.getCurrentUser().then((res) => setCurrentUser(res.data));
      userSvc.getUsers().then((res) => {
        setAllUsers(res.data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, allUsers }}>
      {children}
    </UserContext.Provider>
  );
}
