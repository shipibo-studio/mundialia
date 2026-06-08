"use client";

import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/components/auth-provider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <Header />
        <main className="pt-34 sm:pt-28 pb-24 md:pb-12 px-gutter max-w-container-max mx-auto overflow-x-hidden">
          {children}
        </main>
        <MobileNav />
      </ToastProvider>
    </AuthProvider>
  );
}
