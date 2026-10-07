"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Terminal,
  Shield,
  ArrowLeft,
  FastForward,
} from "lucide-react";

interface AnalyzingScreenProps {
  onComplete: () => void;
  onCancel: () => void;
  targetUrl?: string;
}

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({
  onComplete,
  onCancel,
  targetUrl = "https://secure-hdfc-kyc-update.com/login",
}) => {
  const [activeStep, setActiveStep] = useState<number>(3); // 0..3
  const [logs, setLogs] = useState<string[]>([
    "Initializing ephemeral worker runtime...",
    "QR matrix scanned & error-correction decoded.",
    `Extracted target URL: ${targetUrl}`,
    "Spawning headless Chromium container in sandbox namespace...",
  ]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "Network route intercepted: monitoring outbound requests...",
        "SSL Handshake inspected: self-signed untrusted authority",
      ]);
    }, 1200);

    const timer2 = setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "DOM render complete. Analyzing DOM elements...",
        "Identified password input element: <input type='password' />",
        "Identified SMS OTP prompt: 6-digit verification input",
        "Capturing 1280x800 viewport raster buffer...",
      ]);
    }, 2400);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete, targetUrl]);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Top Controls */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={onCancel}
          className="chip text-xs font-bold text-muted hover:text-ink flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel Inspection</span>
        </button>

        <button
          onClick={onComplete}
          className="chip text-xs font-bold text-ink hover:bg-butter transition flex items-center gap-1.5"
        >
          <span>Skip to Result</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Analysis Card */}
      <div className="w-full bg-white border-[3px] border-ink rounded-card shadow-brutal p-6 sm:p-8 relative">
        {/* Floating Sticker */}
        <div className="absolute -top-3.5 -right-3 rotate-3">
          <span className="sticker bg-sky text-ink">
            ISOLATED WORKER
          </span>
        </div>

        {/* Eyebrow & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase font-bold tracking-widest text-muted">
              STEP 2 OF 3 • SANDBOX DETONATION
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-ink tracking-tight">
            ANALYZING DESTINATION
          </h2>

          <p className="text-sm font-medium text-muted mt-1">
            Inspecting unknown link in a disposable Playwright container away from
            your device.
          </p>
        </div>

        {/* Live Checklist as specified in IMPLEMENTATION_PLAN.md */}
        <div className="bg-[#FAF8F5] border-[2px] border-ink rounded-2xl p-5 mb-6 space-y-3.5">
          {/* Step 1: QR decoded */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-mint border-[2px] border-ink flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-ink stroke-[2.5]" />
              </div>
              <span className="font-bold text-sm sm:text-base text-ink">
                QR decoded
              </span>
            </div>
            <span className="chip text-[11px] font-mono py-1 px-2.5 bg-white text-muted">
              RAW_PAYLOAD_OK
            </span>
          </div>

          {/* Step 2: URL extracted */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-mint border-[2px] border-ink flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-ink stroke-[2.5]" />
              </div>
              <span className="font-bold text-sm sm:text-base text-ink">
                URL extracted
              </span>
            </div>
            <span className="chip text-[11px] font-mono py-1 px-2.5 bg-white text-ink font-semibold max-w-[180px] sm:max-w-xs truncate">
              {targetUrl}
            </span>
          </div>

          {/* Step 3: Security checks */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-mint border-[2px] border-ink flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-ink stroke-[2.5]" />
              </div>
              <span className="font-bold text-sm sm:text-base text-ink">
                Security checks
              </span>
            </div>
            <span className="chip text-[11px] font-mono py-1 px-2.5 bg-white text-muted">
              DOMAIN_LOOKALIKE_FLAGGED
            </span>
          </div>

          {/* Step 4: Inspecting safely... (pulsing/active) */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-butter border-[2px] border-ink flex items-center justify-center animate-spin">
                <Loader2 className="w-4 h-4 text-ink stroke-[2.5]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-ink">
                  Inspecting safely...
                </span>
                <span className="w-2 h-2 rounded-full bg-coral animate-ping" />
              </div>
            </div>
            <span className="badge bg-butter text-ink border-[1.5px] border-ink text-[11px]">
              HEADLESS_PLAYWRIGHT
            </span>
          </div>
        </div>

        {/* Live Sandbox Terminal Feed */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-ink" />
              <span>Container Telemetry Log</span>
            </span>
            <span className="font-mono text-[10px] text-muted">
              CONTAINER_ID: worker_isolated_84
            </span>
          </div>

          <div className="bg-[#17151F] text-[#F5F1E8] rounded-2xl p-4 font-mono text-xs max-h-44 overflow-y-auto space-y-1.5 shadow-inner border-[2px] border-ink">
            {logs.map((log, i) => (
              <div key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-butter select-none">&gt;</span>
                <span className="text-gray-200">{log}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-coral animate-pulse">
              <span className="text-butter select-none">&gt;</span>
              <span>Running Playwright behavioral audit...</span>
            </div>
          </div>
        </div>

        {/* Safety Assurance Note */}
        <div className="mt-6 flex items-center gap-3 bg-cream p-3.5 rounded-xl border border-ink/20">
          <Shield className="w-5 h-5 text-ink shrink-0" />
          <p className="text-xs text-muted font-medium">
            No HTTP traffic, local cookies, or browser fingerprints are shared
            between this target and your physical client.
          </p>
        </div>
      </div>
    </section>
  );
};
