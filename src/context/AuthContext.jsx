import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
export const AuthContext = createContext({
  handleLoggedIn: () => {},
  isAuthenticated: () => {},
});

function isExpired(token) {
  const decoded = jwtDecode(token);
  const expirationTime = decoded.exp;
  const currentTime = Date.now() / 1000;
  if (expirationTime < currentTime) {
    return true;
  } else {
    return false;
  }
}

export const AuthProvider = ({ children }) => {
  // function handleLoggedIn(value) {
  //   setLoggedIn(value);
  // }

  useEffect(() => {
    isAuthenticated();
  }, []);

  // function isAuthenticated() {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (accessToken) {
  //     if (!isExpired(accessToken)) {
  //       console.log("is logged in");
  //       setLoggedIn(true);
  //     }
  //   } else {
  //     console.log("is logged out");
  //     setLoggedIn(false);
  //   }
  // }
  function isAuthenticated() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      if (!isExpired(accessToken)) {
        console.log("is logged in");
        // setLoggedIn(true);
        return true;
      }
    } else {
      console.log("is logged out");
      // setLoggedIn(false);
      return false;
    }
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
