import { createContext, useEffect, useState } from "react";
import React from "react";
import * as userSvc from "../services/user";

export const UserContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
});

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      userSvc.getCurrentUser().then((res) => setCurrentUser(res.data));
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
