"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "fixture", label: "Fixture", href: "/app" },
  { id: "canales", label: "Canales", href: "/app/canales" },
  { id: "eliminatorias", label: "Eliminatorias", href: "/app?tab=eliminatorias" },
  { id: "configuracion", label: "⚙️", href: "/app/configuracion" },
];

export function Header() {
  const pathname = usePathname();
  const activeTab = pathname === "/app" ? "fixture"
    : pathname === "/app/canales" ? "canales"
    : pathname === "/app/configuracion" ? "configuracion"
    : pathname.includes("tab=eliminatorias") ? "eliminatorias"
    : pathname.includes("tab=json") ? "json"
    : null;

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-container-max z-50 glass-card backdrop-blur-xl rounded-xl border border-primary/10 shadow-2xl">
      <div className="flex justify-between items-center px-4 py-3">
        <Link href="/app" className="typo-headline-lg text-primary tracking-tight uppercase font-bold neon-text-cyan cursor-pointer hover:opacity-80 transition-opacity">
          FIFA WORLD CUP 2026
        </Link>
        <nav className="hidden md:flex gap-md">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "typo-label-caps uppercase transition-all duration-300 pb-1 cursor-pointer",
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary neon-text-cyan"
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-xs">
          <Link href="/api/auth/logout" className="material-symbols-outlined text-primary p-xs rounded-full hover:bg-white/5 cursor-pointer neon-text-cyan">
            logout
          </Link>
        </div>
      </div>
    </header>
  );
}
