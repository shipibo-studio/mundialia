"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "fixture", icon: "calendar_month", label: "Fixture", href: "/app" },
  { id: "canales", icon: "tv", label: "Canales", href: "/app/canales" },
  { id: "eliminatorias", icon: "account_tree", label: "Eliminatorias", href: "/app/eliminatorias" },
  { id: "configuracion", icon: "settings", label: "Ajustes", href: "/app/configuracion" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full flex justify-around p-2 pb-safe bg-surface-container-highest/90 backdrop-blur-xl border-t border-white/5 md:hidden z-50">
      {navItems.map((item) => {
        const isActive =
          item.id === "fixture"
            ? pathname === "/app"
            : pathname === item.href;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center rounded-xl p-2 transition-all duration-200 cursor-pointer",
              isActive
                ? "bg-primary-container text-on-primary-container neon-glow-cyan"
                : "text-text-muted"
            )}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="typo-label-caps">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
