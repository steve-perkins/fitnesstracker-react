import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

const GoogleOAuthProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
};

export default GoogleOAuthProviderWrapper;
