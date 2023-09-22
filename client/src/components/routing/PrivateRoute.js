import React, { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ redirect, element }) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  return !isAuthenticated && !loading ? <Navigate to={redirect} /> : element;
}

export default PrivateRoute;
