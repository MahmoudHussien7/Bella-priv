// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAllowed, redirectPath = "/" }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute;

// children=component, isAllowed=hasPermission, redirectPath=redirectLink 