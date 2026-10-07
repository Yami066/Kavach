"use client";

import React, { useRef } from "react";
import {
  Scan,
  Upload,
  ShieldAlert,
  Lock,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Terminal,
  AlertTriangle,
} from "lucide-react";

interface ScanScreenProps {
  onStartScan: () => void;
  onUploadQR: (filename?: string) => void;
  onSelectSample: (type: "bank" | "shortlink" | "clean") => void;
}

export const ScanScreen: React.FC<ScanScreenProps> = ({
  onStartScan,
  onUploadQR,
  onSelectSample,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadQR(file.name);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Hero Headline Section */}
      <div className="text-center max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-xs uppercase font-bold tracking-widest text-muted">
            ZERO-TRUST DESTINATION INSPECTION
          </span>
          <span className="sticker bg-butter text-ink rotate-2 text-[11px]">
            ACTIVE SHIELD
          </span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-[1.08] mb-4">
          Inspect <span className="marker-highlight">before you interact.</span>
        </h1>

        <p className="text-muted text-base sm:text-lg font-medium max-w-xl mx-auto leading-relaxed">
          Never open an unverified QR destination directly on your personal
          device. QR Kavach spins up a disposable cloud sandbox to inspect
          threats, credential stealers, and phishing redirects in real time.
        </p>
      </div>

      {/* Main Scanner Container Card */}
      <div className="w-full max-w-md bg-white border-[3px] border-ink rounded-card shadow-brutal p-6 sm:p-8 relative mb-8">
        {/* Floating Sticker */}
        <div className="absolute -top-3.5 -right-3 rotate-6">
          <span className="sticker bg-butter text-ink shadow-[2px_2px_0_0_#17151F]">
            ZERO TRUST
          </span>
        </div>

        {/* Viewfinder Area */}
        <div className="relative w-full aspect-square max-h-[300px] bg-[#FAF8F5] border-[2.5px] border-dashed border-ink/40 rounded-[22px] flex flex-col items-center justify-center overflow-hidden mb-6 group">
          {/* Viewfinder Corners */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-[3px] border-l-[3px] border-ink rounded-tl" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-[3px] border-r-[3px] border-ink rounded-tr" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-[3px] border-l-[3px] border-ink rounded-bl" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-[3px] border-r-[3px] border-ink rounded-br" />

          {/* Animated Laser Beam */}
          <div className="animate-laser" />

          {/* QR Graphic Silhouette */}
          <div className="w-36 h-36 border-[3px] border-ink/80 rounded-2xl p-2.5 bg-white shadow-clay flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="w-8 h-8 border-[3px] border-ink bg-ink/10 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-ink rounded-sm" />
              </div>
              <div className="w-8 h-8 border-[3px] border-ink bg-ink/10 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-ink rounded-sm" />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-butter border-[2px] border-ink flex items-center justify-center">
                <Lock className="w-5 h-5 text-ink stroke-[2.5]" />
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="w-8 h-8 border-[3px] border-ink bg-ink/10 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-ink rounded-sm" />
              </div>
              <div className="grid grid-cols-2 gap-1 w-7 h-7">
                <div className="bg-ink rounded-xs" />
                <div className="bg-ink rounded-xs" />
                <div className="bg-ink rounded-xs" />
                <div className="bg-ink/30 rounded-xs" />
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs font-bold text-muted uppercase tracking-wider">
            Align QR code inside viewfinder
          </p>
        </div>

        {/* Primary Scan Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onStartScan}
            className="btn-primary w-full text-base font-bold py-3.5 text-center justify-center"
          >
            <Scan className="w-5 h-5 stroke-[2.5]" />
            <span>Scan QR</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-secondary w-full text-base font-bold py-3 text-center justify-center"
          >
            <Upload className="w-5 h-5 stroke-[2.5]" />
            <span>Upload QR</span>
          </button>
        </div>

        {/* Demo Test Scenarios */}
        <div className="mt-6 pt-5 border-t-[2px] border-ink/10">
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-ink" />
            <span>Stage 1 UI Demo Scenarios:</span>
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onSelectSample("bank")}
              className="chip w-full justify-between text-xs py-2 hover:bg-cream-yellow transition text-left"
            >
              <span className="font-semibold text-ink flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-danger" />
                Phishing Bank QR (High Risk)
              </span>
              <span className="font-mono text-[10px] text-danger font-bold">
                87/100
              </span>
            </button>
            <button
              onClick={() => onSelectSample("shortlink")}
              className="chip w-full justify-between text-xs py-2 hover:bg-cream-yellow transition text-left"
            >
              <span className="font-semibold text-ink flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#B26B00]" />
                Obfuscated Shortlink (Caution)
              </span>
              <span className="font-mono text-[10px] text-[#B26B00] font-bold">
                48/100
              </span>
            </button>
            <button
              onClick={() => onSelectSample("clean")}
              className="chip w-full justify-between text-xs py-2 hover:bg-mint/40 transition text-left"
            >
              <span className="font-semibold text-ink flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#227010]" />
                Clean Merchant QR (Safe)
              </span>
              <span className="font-mono text-[10px] text-[#227010] font-bold">
                08/100
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Notice Banner (matching design.md section 5) */}
      <div className="w-full max-w-2xl bg-cream-yellow rounded-card p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-clay">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-butter border-[2px] border-ink flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4 text-ink" />
          </div>
          <div>
            <p className="font-bold text-sm text-ink leading-snug">
              Isolated Sandbox Detonation
            </p>
            <p className="text-xs text-muted">
              Never routes through your local IP or exposes auth cookies
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="bg-white rounded-full px-3 py-1 font-mono text-xs font-semibold border border-ink/20 shadow-xs">
            PLAYWRIGHT_SANDBOX
          </span>
        </div>
      </div>

      {/* 3 Pastel Feature Cards Grid (design.md rule: one pastel per card) */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Lavender */}
        <div className="bg-lavender border-[3px] border-ink rounded-card shadow-brutal p-6 flex flex-col justify-between">
          <div>
            <span className="badge bg-white text-ink border-[2px] border-ink mb-3 text-[11px]">
              STEP 1 • ISOLATION
            </span>
            <h3 className="font-display font-extrabold text-xl text-ink mb-2">
              Disposable Sandbox
            </h3>
            <p className="text-xs sm:text-sm text-ink/80 leading-relaxed font-medium">
              Target URLs render strictly inside headless container workers
              completely segregated from your mobile device.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t-[2px] border-ink/10 flex items-center justify-between text-xs font-bold text-ink">
            <span>Ephemeral Container</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 2: Sky */}
        <div className="bg-sky border-[3px] border-ink rounded-card shadow-brutal p-6 flex flex-col justify-between">
          <div>
            <span className="badge bg-white text-ink border-[2px] border-ink mb-3 text-[11px]">
              STEP 2 • EVIDENCE
            </span>
            <h3 className="font-display font-extrabold text-xl text-ink mb-2">
              Behavioral Sniffer
            </h3>
            <p className="text-xs sm:text-sm text-ink/80 leading-relaxed font-medium">
              Detects password forms, credential traps, look-alike domains, and
              stealth multi-hop redirects before you click.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t-[2px] border-ink/10 flex items-center justify-between text-xs font-bold text-ink">
            <span>DOM Inspection</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 3: Mint */}
        <div className="bg-mint border-[3px] border-ink rounded-card shadow-brutal p-6 flex flex-col justify-between">
          <div>
            <span className="badge bg-white text-ink border-[2px] border-ink mb-3 text-[11px]">
              STEP 3 • VERDICT
            </span>
            <h3 className="font-display font-extrabold text-xl text-ink mb-2">
              Risk Score & Preview
            </h3>
            <p className="text-xs sm:text-sm text-ink/80 leading-relaxed font-medium">
              Review a transparent 0-100 risk rating, threat checklist, and safe
              sandbox screenshot before opening any link.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t-[2px] border-ink/10 flex items-center justify-between text-xs font-bold text-ink">
            <span>Visual Proof</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};
