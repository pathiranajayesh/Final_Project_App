import React, { createContext, useState, useEffect, ReactNode } from "react";
import { refreshAccessToken } from "../services/authService";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(
      localStorage.getItem("accessToken")
    );
  
    useEffect(() => {
      if (!accessToken) {
        refreshAccessToken()
          .then((newToken) => setAccessToken(newToken))
          .catch(() => setAccessToken(null));
      }
    }, [accessToken]);
  
    return (
      <AuthContext.Provider value={{ accessToken, setAccessToken }}>
        {children}
      </AuthContext.Provider>
    );
  };
  