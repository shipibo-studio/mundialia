"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "fixture", label: "Fixture" },
  { id: "canales", label: "Canales" },
  { id: "eliminatorias", label: "Eliminatorias" },
];

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Header({ activeTab: externalTab, onTabChange }: HeaderProps) {
  const [internalTab, setInternalTab] = useState("fixture");

  const activeTab = externalTab ?? internalTab;

  const handleTabClick = (tabId: string) => {
    setInternalTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="flex justify-between items-center px-10 py-5 w-[calc(100%-2rem)] max-w-container-max mx-auto glass-card backdrop-blur-xl rounded-b-xl border border-primary/40 shadow-2xl">
        <div className="typo-headline-lg text-primary tracking-tight uppercase font-bold neon-text-cyan">
          FIFA WORLD CUP 2026
        </div>
        <nav className="hidden md:flex gap-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "typo-label-caps uppercase transition-all duration-300 pb-1 cursor-pointer",
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary neon-text-cyan"
                  : "text-on-surface-variant hover:text-primary"
              )}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="flex gap-xs">
          <span className="material-symbols-outlined text-primary p-xs rounded-full hover:bg-white/5 cursor-pointer neon-text-cyan">
            notifications
          </span>
          <span className="material-symbols-outlined text-primary p-xs rounded-full hover:bg-white/5 cursor-pointer neon-text-cyan">
            person
          </span>
        </div>
      </div>
    </header>
  );
}
