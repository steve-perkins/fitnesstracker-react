import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React from "react";

import { useAuth } from "../context/useAuth.ts";

const GoogleLoginButton: React.FC = () => {
  const { setToken } = useAuth();

  const handleSuccess = (response: CredentialResponse) => {
    console.log("Login Success:", response);
    if (response.credential) {
      setToken(response.credential);
      console.log("Stored credential:", response.credential);
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default GoogleLoginButton;
