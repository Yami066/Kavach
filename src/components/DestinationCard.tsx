"use client";

import React from "react";
import {
  ShieldAlert,
  Lock,
  ExternalLink,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  Globe,
  Radio,
} from "lucide-react";

interface DestinationCardProps {
  decodedUrl: string;
  onInspect: (url: string) => void;
  onScanAnother: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  decodedUrl,
  onInspect,
  onScanAnother,
}) => {
  // Parse URL details if valid
  let protocol = "UNKNOWN";
  let hostname = "RAW_PAYLOAD";
  let pathname = "";

  try {
    if (decodedUrl.startsWith("http://") || decodedUrl.startsWith("https://")) {
      const parsed = new URL(decodedUrl);
      protocol = parsed.protocol.replace(":", "").toUpperCase();
      hostname = parsed.hostname;
      pathname = parsed.pathname + parsed.search;
    } else if (decodedUrl.startsWith("upi://")) {
      protocol = "UPI_INTENT";
      hostname = "NPCI / BharatQR";
    }
  } catch {
    // raw string
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white border-[3px] border-ink rounded-card shadow-brutal p-6 sm:p-8 relative transition-all animate-in fade-in zoom-in-95 duration-200">
      {/* Neo-brutalist corner sticker */}
      <div className="absolute -top-3.5 -right-3 rotate-[-2deg]">
        <span className="sticker bg-butter text-ink shadow-[2px_2px_0_0_#17151F]">
          DESTINATION DETECTED
        </span>
      </div>

      {/* Eyebrow & Status */}
      <div className="flex items-center gap-2 mb-2">
        <span className="badge bg-mint text-ink border border-ink text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping mr-1" />
          QR_MATRIX_DECODED
        </span>
        <span className="text-xs uppercase font-bold tracking-widest text-muted">
          PRE-INTERACTION GATE
        </span>
      </div>

      <h2 className="font-display font-black text-2xl sm:text-3xl text-ink tracking-tight mb-2">
        Destination detected
      </h2>

      <p className="text-xs sm:text-sm font-medium text-muted leading-relaxed mb-6">
        The QR code was successfully decoded into an outbound destination. To
        protect your device, this URL has{" "}
        <strong className="text-ink underline decoration-butter decoration-2">
          NOT
        </strong>{" "}
        been opened on your phone or browser.
      </p>

      {/* Target URL Display Box */}
      <div className="bg-[#FAF8F5] border-[2.5px] border-ink rounded-2xl p-4 sm:p-5 mb-6 shadow-clay">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-ink/15 text-xs font-bold text-muted">
          <span className="flex items-center gap-1.5 uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-ink" />
            Extracted Endpoint
          </span>
          <span
            className={`font-mono text-[11px] px-2 py-0.5 rounded-full border border-ink/20 ${
              protocol === "HTTPS"
                ? "bg-[#E8F8DE] text-[#227010]"
                : "bg-cream-yellow text-ink"
            }`}
          >
            {protocol}
          </span>
        </div>

        {/* Full URL with wrapping */}
        <div className="break-all font-mono text-sm sm:text-base text-ink font-bold py-1 flex items-start gap-2">
          <Lock className="w-4 h-4 text-ink shrink-0 mt-1" />
          <span>{decodedUrl}</span>
        </div>

        {hostname !== "RAW_PAYLOAD" && (
          <div className="mt-3 pt-2.5 border-t border-ink/10 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted font-semibold">Target Domain:</span>
            <span className="chip bg-white py-0.5 px-2 text-xs font-mono font-bold text-ink">
              {hostname}
            </span>
          </div>
        )}
      </div>

      {/* Safety Quarantine Assurance */}
      <div className="bg-[#FDF1D0] rounded-xl p-3.5 mb-6 border border-ink/20 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-ink shrink-0 mt-0.5" />
        <p className="text-xs text-ink/90 font-medium leading-relaxed">
          <strong>Zero-Trust Quarantine:</strong> QR Kavach will dispatch an
          isolated headless browser worker to inspect the page DOM, capture
          network hops, and test for credential stealers.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => onInspect(decodedUrl)}
          className="btn-primary w-full sm:flex-1 text-base font-bold py-3.5 text-center justify-center"
        >
          <span>[ Inspect destination ]</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          onClick={onScanAnother}
          className="btn-secondary w-full sm:w-auto text-sm font-bold py-3 px-5 text-center justify-center"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Scan Another</span>
        </button>
      </div>
    </div>
  );
};
