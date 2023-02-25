import { createContext, useEffect, useState } from "react";
import React from "react";
import * as userSvc from "../services/user";

export const UserContext = createContext({
  currentUser: {},
});

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    userSvc.getCurrentUser().then((res) => setCurrentUser(res.data));
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
}
