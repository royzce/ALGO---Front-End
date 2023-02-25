import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  accessToken: null,
  isLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
    setLoggedIn(true);
    // console.log("accessToken is ", accessToken);
    if (!accessToken) {
      // Perform logout logic
      //....
      setAccessToken(null);
      setLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
