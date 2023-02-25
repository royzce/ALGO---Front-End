import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const GuardedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export default GuardedRoute;
