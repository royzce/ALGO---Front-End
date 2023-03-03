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
  useEffect(() => {
    isAuthenticated();
  }, []);

  function isAuthenticated() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      if (!isExpired(accessToken)) {
        return true;
      }
    } else {
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
