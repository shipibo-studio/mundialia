"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { useAuth } from "@/components/auth-provider";

interface SubscriptionsContextType {
  subscribed: Record<number, boolean>;
  loading: boolean;
  refresh: (partidos: number[]) => void;
  setOptimistic: (partidoNumero: number, value: boolean) => void;
}

const SubscriptionsContext = createContext<SubscriptionsContextType>({
  subscribed: {},
  loading: false,
  refresh: () => { },
  setOptimistic: () => { },
});

export function SubscriptionsProvider({
  children,
  partidos,
}: {
  children: ReactNode;
  partidos: number[];
}) {
  const { loggedIn } = useAuth();
  const [subscribed, setSubscribed] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async (ids: number[]) => {
    if (!ids.length) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partidos: ids }),
      });
      const data = await res.json();
      setSubscribed((prev) => ({ ...prev, ...data.subscribed }));
    } catch { }
    setLoading(false);
  }, []);

  const setOptimistic = useCallback((partidoNumero: number, value: boolean) => {
    setSubscribed((prev) => ({ ...prev, [partidoNumero]: value }));
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      setSubscribed({});
      return;
    }
    refresh(partidos);
  }, [loggedIn, refresh, partidos]);

  return (
    <SubscriptionsContext.Provider value={{ subscribed, loading, refresh, setOptimistic }}>
      {children}
    </SubscriptionsContext.Provider>
  );
}

export function useSubscriptions() {
  return useContext(SubscriptionsContext);
}
