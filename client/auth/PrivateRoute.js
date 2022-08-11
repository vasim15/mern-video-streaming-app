import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import auth from "./auth-helper";
const PrivateRoute = ({element}) => {
  return auth.isAuthenticated() ? (
    element
  ) : (
    <Navigate to="signin" state={{ from: "location" }} />
  );
};

export default PrivateRoute;
