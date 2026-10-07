"use client";

import React, { useState } from "react";
import {
  Camera,
  UploadCloud,
  ShieldAlert,
  Boxes,
  KeyRound,
  GitFork,
  Cpu,
  MonitorCheck,
  Flame,
  Info,
  Sparkles,
} from "lucide-react";

interface FeatureItem {
  id: string;
  name: string;
  shortLabel: string;
  category: string;
  colorClass: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  techStack: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: "camera-scanner",
    name: "WebRTC Camera Scanner",
    shortLabel: "Live Camera",
    category: "FRONTEND",
    colorClass: "bg-butter",
    badgeColor: "bg-butter/50",
    icon: Camera,
    description:
      "Captures real-time camera frames and decodes QR matrices client-side via jsQR canvas buffers without uploading raw imagery.",
    techStack: "WebRTC • HTML5 Canvas • jsQR",
  },
  {
    id: "file-decoder",
    name: "Image QR Decoder",
    shortLabel: "File Upload",
    category: "FRONTEND",
    colorClass: "bg-sky",
    badgeColor: "bg-sky/50",
    icon: UploadCloud,
    description:
      "Client-side image file parser that extracts, crops, and decodes QR codes from saved gallery photos, receipts, or screenshots.",
    techStack: "FileReader API • jsQR Uint8ClampedArray",
  },
  {
    id: "quarantine-gate",
    name: "Zero-Trust Quarantine",
    shortLabel: "Quarantine",
    category: "SECURITY",
    colorClass: "bg-coral",
    badgeColor: "bg-coral/50",
    icon: ShieldAlert,
    description:
      "Strict security interceptor that prevents your mobile OS from auto-launching links, isolating raw URLs in client quarantine.",
    techStack: "Pre-Interaction Threat Interceptor",
  },
  {
    id: "playwright-sandbox",
    name: "Disposable Sandbox",
    shortLabel: "Playwright",
    category: "BACKEND",
    colorClass: "bg-lavender",
    badgeColor: "bg-lavender/50",
    icon: Boxes,
    description:
      "Spins up an ephemeral, containerized Chromium browser worker per scan to detonate and navigate untrusted links in full isolation.",
    techStack: "FastAPI • Playwright Async • Docker",
  },
  {
    id: "form-sniffer",
    name: "Credential Form Sniffer",
    shortLabel: "Form Sniffer",
    category: "ANALYSIS",
    colorClass: "bg-danger text-white",
    badgeColor: "bg-[#FDECEC] text-danger",
    icon: KeyRound,
    description:
      "Inspects rendered DOM elements to uncover password inputs, 6-digit OTP verification traps, and deceptive login actions.",
    techStack: "DOM QuerySelectorAll • Input Pattern Matching",
  },
  {
    id: "redirect-tracer",
    name: "Multi-Hop Redirect Tracker",
    shortLabel: "Redirects",
    category: "NETWORK",
    colorClass: "bg-sky",
    badgeColor: "bg-sky/50",
    icon: GitFork,
    description:
      "Intercepts HTTP 301, 302, and 307 hops in real-time, exposing concealed URL shorteners and multi-step evasion redirects.",
    techStack: "Playwright Network Response Interceptor",
  },
  {
    id: "risk-engine",
    name: "Deterministic Risk Engine",
    shortLabel: "Risk Engine",
    category: "ENGINE",
    colorClass: "bg-butter",
    badgeColor: "bg-butter/50",
    icon: Cpu,
    description:
      "Calibrated 0–100 scoring model evaluating look-alike domains (+20), passwords (+25), OTPs (+25), and redirects (+10) into SAFE, CAUTION, or DANGER.",
    techStack: "Weighted Factor Scoring (Stage 4)",
  },
  {
    id: "screenshot-buffer",
    name: "Visual Proof Capture",
    shortLabel: "Screenshot",
    category: "EVIDENCE",
    colorClass: "bg-mint",
    badgeColor: "bg-mint/50",
    icon: MonitorCheck,
    description:
      "Renders high-resolution base64 PNG snapshots of the destination inside a mock browser viewport so you safely preview without clicking.",
    techStack: "Base64 Viewport Buffer • Chromium Render",
  },
  {
    id: "sandbox-purge",
    name: "Ephemeral Process Purge",
    shortLabel: "Auto Purge",
    category: "LIFECYCLE",
    colorClass: "bg-coral",
    badgeColor: "bg-coral/50",
    icon: Flame,
    description:
      "Immediately terminates browser processes and wipes temporary memory contexts post-capture, leaving zero persistent state.",
    techStack: "Context.close() • Ephemeral Container Worker",
  },
];

export function FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState<FeatureItem>(FEATURES[3]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const displayedFeature = hoveredId
    ? FEATURES.find((f) => f.id === hoveredId) || activeFeature
    : activeFeature;

  return (
    <div className="w-full max-w-4xl bg-white border-[3px] border-ink rounded-card shadow-brutal p-6 sm:p-8 mb-8">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-yellow border-[2px] border-ink text-[11px] font-mono font-bold text-ink mb-2.5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PROJECT ARCHITECTURE & FEATURES</span>
        </div>
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-ink tracking-tight mb-2">
          Interactive Feature Radar
        </h3>
        <p className="text-xs sm:text-sm text-muted">
          Hover or tap any circular node below to explore the core subsystems powering QR Kavach.
        </p>
      </div>

      {/* Feature Circles Carousel / Row */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4.5 pt-10 pb-5">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          const isSelected = displayedFeature.id === feature.id;

          return (
            <div key={feature.id} className="relative group">
              {/* Feature Circle Button */}
              <button
                type="button"
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveFeature(feature)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[3px] border-ink flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                  feature.colorClass
                } ${
                  isSelected
                    ? "-translate-y-1.5 shadow-[4px_4px_0_0_#17151F] scale-105 ring-2 ring-ink ring-offset-2"
                    : "shadow-[2px_2px_0_0_#17151F] hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#17151F]"
                }`}
                aria-label={feature.name}
              >
                <Icon
                  className={`w-6 h-6 stroke-[2.5] transition-transform duration-200 ${
                    isSelected ? "scale-110" : "group-hover:scale-105"
                  }`}
                />
              </button>

              {/* Short Label Under Circle */}
              <span className="block text-[11px] font-mono font-bold text-ink text-center mt-1.5 truncate max-w-[68px]">
                {feature.shortLabel}
              </span>

              {/* Hover Floating Mini Tooltip (Desktop) */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-6 w-56 p-2.5 bg-white border-[2.5px] border-ink rounded-xl shadow-brutal pointer-events-none z-30 transition-all duration-150 hidden md:group-hover:block ${
                  hoveredId === feature.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-ink/20 bg-cream">
                    {feature.category}
                  </span>
                  <span className="text-[9px] font-mono text-muted">Feature Node</span>
                </div>
                <p className="font-display font-bold text-xs text-ink leading-tight">
                  {feature.name}
                </p>
                <p className="text-[11px] text-ink/80 mt-1 leading-snug line-clamp-2">
                  {feature.description}
                </p>
                {/* Tooltip Arrow (pointing upwards) */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 w-2.5 h-2.5 bg-white border-l-[2.5px] border-t-[2.5px] border-ink rotate-45" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Feature Detail Drawer (Mobile + Desktop Expanded View) */}
      <div className="mt-2 bg-[#FAF8F5] border-[2.5px] border-ink rounded-2xl p-4 sm:p-5 shadow-clay transition-all duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b-[2px] border-ink/10 mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-full border-[2px] border-ink flex items-center justify-center shrink-0 shadow-xs ${displayedFeature.colorClass}`}
            >
              {React.createElement(displayedFeature.icon, {
                className: "w-5 h-5 stroke-[2.5]",
              })}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-display font-extrabold text-base sm:text-lg text-ink leading-none">
                  {displayedFeature.name}
                </h4>
                <span className="badge bg-white text-ink text-[10px] font-mono py-0.5">
                  {displayedFeature.category}
                </span>
              </div>
              <p className="text-[11px] font-mono text-muted mt-0.5">
                Tech: {displayedFeature.techStack}
              </p>
            </div>
          </div>

          <span className="chip text-[11px] py-1 px-2.5 bg-white font-mono font-bold self-start sm:self-center">
            ACTIVE SUBSYSTEM
          </span>
        </div>

        {/* 1-2 Line Description */}
        <p className="text-xs sm:text-sm text-ink/90 font-medium leading-relaxed">
          {displayedFeature.description}
        </p>
      </div>
    </div>
  );
}
