import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
export const AuthContext = createContext({
  isLoggedIn: false,
  handleLoggedIn: () => {},
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
  const [isLoggedIn, setLoggedIn] = useState(false);

  function handleLoggedIn(value) {
    setLoggedIn(value);
  }

  useEffect(() => {
    isAuthenticated();
  }, [isLoggedIn]);

  function isAuthenticated() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      if (!isExpired(accessToken)) {
        console.log("is logged in");
        setLoggedIn(true);
      }
    } else {
      console.log("is logged out");
      setLoggedIn(false);
    }
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLoggedIn: setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
