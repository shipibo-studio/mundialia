"use client";

import { cn } from "@/lib/utils";

interface MobileNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const navItems = [
  { id: "fixture", icon: "calendar_month", label: "Fixture" },
  { id: "canales", icon: "tv", label: "Canales" },
  { id: "eliminatorias", icon: "account_tree", label: "Bracket" },
];

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const handleClick = (tabId: string) => {
    onTabChange?.(tabId);
  };

  return (
    <nav className="fixed bottom-0 w-full flex justify-around p-2 pb-safe bg-surface-container-highest/90 backdrop-blur-xl border-t border-white/5 md:hidden z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={cn(
            "flex flex-col items-center justify-center rounded-xl p-2 transition-all duration-200 cursor-pointer",
            activeTab === item.id
              ? "bg-primary-container text-on-primary-container neon-glow-cyan"
              : "text-text-muted"
          )}
          onClick={() => handleClick(item.id)}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="typo-label-caps">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
