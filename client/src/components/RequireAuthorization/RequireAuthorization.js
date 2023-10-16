import React from "react";
import { useSelector } from "react-redux";
import Unauthorized from "../Unauthorized/Unauthorized";

export default function RequireAuthorization({ role, children }) {
  const user = useSelector((state) => state.user);
  const roles = (Array.isArray(role) ? role : [role]).filter(Boolean);
  const isLoggedIn = Object.keys(user).length > 0;
  const hasRole = !roles.length || roles.includes(user.role);
  const isAuthorized = isLoggedIn && hasRole;

  return isAuthorized ? <>{children}</> : <Unauthorized />;
}
