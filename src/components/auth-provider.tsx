"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AuthState {
  loggedIn: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({ loggedIn: false, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      setLoggedIn(false);
      setLoading(false);
      return;
    }

    // Verificar token con el servidor
    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setLoggedIn(data.loggedIn);
        setLoading(false);
        if (!data.loggedIn) {
          localStorage.removeItem("auth_token");
        }
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
