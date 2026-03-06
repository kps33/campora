"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

const MOCK_USER: User = {
  name: "Alex Student",
  email: "alex@campus.edu",
  avatar: "AS",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("campora-auth");
    if (stored === "true") {
      setIsLoggedIn(true);
      setUser(MOCK_USER);
    }
  }, []);

  const login = useCallback(() => {
    setIsLoggedIn(true);
    setUser(MOCK_USER);
    localStorage.setItem("campora-auth", "true");
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("campora-auth");
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
