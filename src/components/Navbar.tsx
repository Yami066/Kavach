"use client";

import React from "react";
import { Shield, Sparkles, ShieldCheck } from "lucide-react";

export type ScreenMode = "scan" | "analyzing" | "result";

interface NavbarProps {
  currentScreen: ScreenMode;
  onSelectScreen: (screen: ScreenMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  return (
    <header className="w-full pt-4 pb-2 px-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 bg-white/95 backdrop-blur-md rounded-full px-5 py-3 border-[3px] border-ink shadow-brutal transition-all">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-butter border-[2.5px] border-ink flex items-center justify-center shadow-[2px_2px_0_0_#17151F]">
            <Shield className="w-5 h-5 text-ink fill-ink/10 stroke-[2.5]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-xl tracking-tight text-ink">
              QR KAVACH
            </span>
            <span className="sticker bg-coral text-white text-[10px] px-2 py-0.5 rotate-[-2deg]">
              STAGE 1
            </span>
          </div>
        </div>

        {/* Screen Switcher (Segmented Tab as per design.md) */}
        <nav className="flex items-center bg-cream rounded-full p-1 border-[2.5px] border-ink">
          <button
            onClick={() => onSelectScreen("scan")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              currentScreen === "scan"
                ? "bg-butter text-ink border-[2px] border-ink shadow-[2px_2px_0_0_#17151F]"
                : "text-muted hover:text-ink"
            }`}
          >
            1. Scan
          </button>
          <button
            onClick={() => onSelectScreen("analyzing")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              currentScreen === "analyzing"
                ? "bg-butter text-ink border-[2px] border-ink shadow-[2px_2px_0_0_#17151F]"
                : "text-muted hover:text-ink"
            }`}
          >
            2. Analyzing
          </button>
          <button
            onClick={() => onSelectScreen("result")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              currentScreen === "result"
                ? "bg-butter text-ink border-[2px] border-ink shadow-[2px_2px_0_0_#17151F]"
                : "text-muted hover:text-ink"
            }`}
          >
            3. Result
          </button>
        </nav>

        {/* Status indicator */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="chip text-xs py-1.5 px-3 font-semibold text-ink flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-mint border border-ink animate-pulse" />
            <span className="font-mono text-[11px]">SANDBOX_ONLINE</span>
          </span>
        </div>
      </div>
    </header>
  );
};
