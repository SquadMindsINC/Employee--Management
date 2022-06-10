import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../src/context/UserAuthContext";
import { withRouter, Redirect, Link } from "react-router-dom";
import { Route, useHistory } from "react-router";


const ProtectedRoute = ({ children }) => {

  const history = useHistory();
  const { user } = useUserAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
