"use client";

import React from "react";
import { Lock, AlertTriangle, ShieldCheck, ExternalLink } from "lucide-react";

interface SandboxScreenshotProps {
  severity: "DANGER" | "CAUTION" | "SAFE";
  url: string;
  screenshotBase64?: string | null;
}

export const SandboxScreenshot: React.FC<SandboxScreenshotProps> = ({
  severity,
  url,
  screenshotBase64,
}) => {
  return (
    <div className="w-full bg-white border-[3px] border-ink rounded-[22px] overflow-hidden shadow-brutal-sm">
      {/* Mock Browser Header Bar */}
      <div className="bg-[#EFEAE1] px-4 py-2.5 border-b-[2.5px] border-ink flex items-center justify-between gap-3">
        {/* Window controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-danger border border-ink" />
          <div className="w-3 h-3 rounded-full bg-butter border border-ink" />
          <div className="w-3 h-3 rounded-full bg-mint border border-ink" />
        </div>

        {/* Address bar */}
        <div className="flex-1 max-w-sm bg-white rounded-full px-3 py-1 border-[1.5px] border-ink/40 flex items-center gap-2 overflow-hidden shadow-xs">
          <Lock
            className={`w-3 h-3 shrink-0 ${
              severity === "DANGER" ? "text-danger" : "text-muted"
            }`}
          />
          <span className="font-mono text-[11px] truncate text-ink font-semibold">
            {url}
          </span>
        </div>

        {/* Watermark badge */}
        <span className="chip text-[10px] py-0.5 px-2 font-mono font-bold uppercase shrink-0 bg-white">
          {screenshotBase64 ? "PLAYWRIGHT_RAW_CAPTURE" : "SANDBOX_PREVIEW"}
        </span>
      </div>

      {/* Warning Tape Banner */}
      {severity === "DANGER" && (
        <div className="bg-danger text-white text-[11px] font-mono font-bold py-1 px-4 flex items-center justify-center gap-2 border-b-[2px] border-ink">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>ISOLATED SANDBOX WORKER — SAFE NON-EXECUTABLE PREVIEW</span>
        </div>
      )}

      {/* Page Content */}
      {screenshotBase64 ? (
        <div className="w-full max-h-[420px] overflow-hidden flex items-center justify-center bg-black/5">
          {/* Real Playwright Captured Viewport */}
          <img
            src={`data:image/png;base64,${screenshotBase64}`}
            alt="Playwright Sandbox Viewport Capture"
            className="w-full h-auto object-cover select-none"
          />
        </div>
      ) : (
        /* Fallback Mock View */
        <div className="p-5 sm:p-7 bg-[#F9F7F2] select-none pointer-events-none relative min-h-[260px] flex flex-col justify-center items-center">
          {severity === "DANGER" && (
            <div className="w-full max-w-sm bg-white border-[2.5px] border-danger/60 rounded-xl p-5 shadow-sm text-center">
              <div className="flex items-center justify-center gap-2 mb-3 pb-3 border-b border-gray-200">
                <div className="w-7 h-7 bg-[#004C8F] rounded flex items-center justify-center text-white font-bold text-xs">
                  🏦
                </div>
                <span className="font-bold text-sm text-[#004C8F] tracking-tight">
                  Secure HDFC NetBanking Portal
                </span>
              </div>

              <div className="bg-[#FDECEC] border border-danger/30 rounded p-2 mb-4 text-left">
                <p className="text-[11px] text-danger font-bold leading-tight">
                  ⚠️ URGENT: Complete mandatory KYC update within 2 hours to avoid
                  account freeze.
                </p>
              </div>

              <div className="space-y-2.5 text-left text-xs">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">
                    Customer ID / User ID
                  </label>
                  <div className="w-full bg-gray-100 border border-gray-300 rounded px-2.5 py-1.5 text-gray-400 font-mono text-[11px]">
                    e.g. 58392019
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-danger flex items-center justify-between mb-1">
                    <span>NetBanking Password</span>
                    <span className="bg-danger/10 text-danger text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">
                      [FLAGGED: PASSWORD]
                    </span>
                  </label>
                  <div className="w-full bg-red-50 border border-danger/50 rounded px-2.5 py-1.5 text-gray-400 font-mono text-[11px]">
                    ••••••••••••
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-danger flex items-center justify-between mb-1">
                    <span>One-Time Password (OTP)</span>
                    <span className="bg-danger/10 text-danger text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">
                      [FLAGGED: OTP]
                    </span>
                  </label>
                  <div className="w-full bg-red-50 border border-danger/50 rounded px-2.5 py-1.5 text-gray-400 font-mono text-[11px]">
                    _ _ _ _ _ _
                  </div>
                </div>

                <div className="w-full bg-[#004C8F] text-white py-2 rounded text-center font-bold text-xs mt-3">
                  Verify &amp; Continue
                </div>
              </div>
            </div>
          )}

          {severity === "CAUTION" && (
            <div className="w-full max-w-sm bg-white border-[2px] border-ink/30 rounded-xl p-5 shadow-sm text-center">
              <div className="w-12 h-12 bg-cream-yellow rounded-full border-[2px] border-ink flex items-center justify-center mx-auto mb-3">
                <ExternalLink className="w-6 h-6 text-ink" />
              </div>
              <h4 className="font-bold text-sm text-ink mb-1">
                Shortlink Redirection Intermediary
              </h4>
              <p className="text-xs text-muted mb-4">
                Destination routes through uncatalogued link aggregator with no
                reputation history.
              </p>
              <div className="font-mono text-xs bg-gray-100 p-2 rounded text-left border">
                Hop 1: bit.ly/promo-291
                <br />
                Hop 2: tracking-ad.net/click?id=9
                <br />
                Target: promotional-store-landing.xyz
              </div>
            </div>
          )}

          {severity === "SAFE" && (
            <div className="w-full max-w-sm bg-white border-[2px] border-[#227010]/40 rounded-xl p-5 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#E8F8DE] rounded-full border-[2px] border-[#227010] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 text-[#227010]" />
              </div>
              <h4 className="font-bold text-sm text-ink mb-1">
                Verified UPI Merchant Gateway
              </h4>
              <p className="text-xs text-muted mb-3">
                Cryptographically signed QR payload matching registered BharatQR
                NPCI specifications.
              </p>
              <div className="font-mono text-[11px] bg-[#E8F8DE] text-[#227010] p-2 rounded text-left border border-[#227010]/30">
                VPA: sharma.kirana@okaxis
                <br />
                Merchant: Sharma Kirana &amp; General Store
                <br />
                SSL: DigiCert Validated Global CA
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
