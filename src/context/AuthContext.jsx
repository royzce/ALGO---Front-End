import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
export const AuthContext = createContext({
  isLoggedIn: false,
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
  const [isLoggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    console.log("auth context");
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      if (!isExpired(accessToken)) {
        setLoggedIn(true);
        console.log("is logged in", isLoggedIn);
      }
    } else {
      console.log("is not logged in", isLoggedIn);
      setLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
