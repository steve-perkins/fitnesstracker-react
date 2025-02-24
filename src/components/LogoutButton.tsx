import React from "react";

import { useAuth } from "../context/useAuth.ts";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    console.log("User logged out");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
