"use client";

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

// ─── Context ──────────────────────────────────────────

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container — bottom-right, fixed */}
      <div className="fixed bottom-6 right-6 z-9999 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto animate-in slide-in-from-right-2 fade-in duration-300",
              "px-2 py-1 rounded-xl shadow-2xl border backdrop-blur-xl",
              "typo-body-md wrap-break-word",
              toast.type === "success" &&
              "bg-pitch-green/20 border-pitch-green/40 text-on-surface neon-border-green",
              toast.type === "error" &&
              "bg-error/20 border-error/40 text-error neon-border-red",
              toast.type === "info" &&
              "bg-surface-container-high/90 border-primary/30 text-on-surface"
            )}
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="material-symbols-outlined text-xs shrink-0">
                {toast.type === "success" && "check_circle"}
                {toast.type === "error" && "error"}
                {toast.type === "info" && "info"}
              </span>
              {toast.message}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
