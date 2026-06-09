"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider, useAuth } from "@/components/auth-provider";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { loggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !loggedIn) {
      router.replace("/");
    }
  }, [loggedIn, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary animate-pulse text-lg">Cargando...</div>
      </div>
    );
  }

  if (!loggedIn) return null;

  return <>{children}</>;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <ToastProvider>
          <Header />
          <main className="pt-34 sm:pt-28 pb-24 md:pb-12 px-gutter max-w-container-max mx-auto overflow-x-hidden">
            {children}
          </main>
          <MobileNav />
        </ToastProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
