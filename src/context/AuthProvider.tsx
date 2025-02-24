import React, {ReactNode, useEffect, useState} from "react";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Handles callbacks from the Google OAuth provider, to store the token upon successful login and remove it upon
 * logout.  Supporting code is refactored into "AuthContext.ts" and "useAuth.ts", to prevent ESLint errors about
 * component files having more than one export.
 *
 * @param children
 * @constructor
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{token, setToken, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
