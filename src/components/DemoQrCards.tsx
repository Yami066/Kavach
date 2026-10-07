"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  ExternalLink,
  Play,
  QrCode,
  Shield,
  Sparkles,
} from "lucide-react";

interface DemoQrCardsProps {
  onSelectTarget: (url: string, expectedSeverity: "DANGER" | "CAUTION" | "SAFE") => void;
}

export function DemoQrCards({ onSelectTarget }: DemoQrCardsProps) {
  const [fakeBankQrUrl, setFakeBankQrUrl] = useState<string>("");
  const [safeMerchantQrUrl, setSafeMerchantQrUrl] = useState<string>("");
  const [baseUrl, setBaseUrl] = useState<string>("http://localhost:3000");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      setBaseUrl(origin);

      const fakeBankTarget = `${origin}/demo/fake-bank-login`;
      const safeMerchantTarget = `${origin}/demo/safe-merchant`;

      QRCode.toDataURL(fakeBankTarget, {
        width: 240,
        margin: 1.5,
        color: {
          dark: "#17151F",
          light: "#FFFFFF",
        },
      })
        .then(setFakeBankQrUrl)
        .catch(console.error);

      QRCode.toDataURL(safeMerchantTarget, {
        width: 240,
        margin: 1.5,
        color: {
          dark: "#17151F",
          light: "#FFFFFF",
        },
      })
        .then(setSafeMerchantQrUrl)
        .catch(console.error);
    }
  }, []);

  const fakeBankUrl = `${baseUrl}/demo/fake-bank-login`;
  const safeMerchantUrl = `${baseUrl}/demo/safe-merchant`;

  const downloadQr = (dataUrl: string, filename: string) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full max-w-2xl bg-white border-[3px] border-ink rounded-card shadow-brutal p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b-[2px] border-ink/10 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge bg-butter text-ink text-[11px] font-mono">
              STAGE 5 DEMO TARGETS
            </span>
            <span className="text-xs font-bold text-ink uppercase tracking-wider">
              Scannable QR Test Harness
            </span>
          </div>
          <p className="text-xs text-muted mt-1">
            Scan these QR codes using your device camera, upload the image, or trigger 1-click detonation.
          </p>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-center">
          <Sparkles className="w-4 h-4 text-ink" />
          <span className="text-[11px] font-mono text-muted">Dual Comparison</span>
        </div>
      </div>

      {/* 2 Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Fake Bank (Phishing) -> Expected DANGER 87/100 */}
        <div className="bg-[#FFF5F5] border-[2.5px] border-danger/80 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="badge bg-[#FDECEC] text-danger border border-danger/30 text-[10px] font-bold">
                PHISHING SIMULATION
              </span>
              <span className="font-mono text-xs font-bold text-danger">
                DANGER · 87/100
              </span>
            </div>

            <h4 className="font-display font-bold text-base text-ink mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-danger shrink-0" />
              Fake Banking QR
            </h4>
            <p className="text-[11px] text-muted mb-3">
              Spoofs <strong>Secure Bank</strong> login with Customer ID, Password, OTP, and 302 redirect.
            </p>

            {/* Scannable QR Code */}
            <div className="bg-white border-[2px] border-ink rounded-xl p-2.5 flex flex-col items-center justify-center mb-3 shadow-xs">
              {fakeBankQrUrl ? (
                <img
                  src={fakeBankQrUrl}
                  alt="Fake Bank QR Code"
                  className="w-32 h-32 object-contain rounded"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center text-xs text-muted font-mono">
                  Generating QR...
                </div>
              )}
              <span className="text-[10px] font-mono text-muted mt-1.5 truncate max-w-[200px]">
                {fakeBankUrl}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => onSelectTarget(fakeBankUrl, "DANGER")}
              className="btn-primary w-full text-xs py-2.5 justify-center bg-danger hover:bg-[#B83232] text-white"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Detonate in Sandbox</span>
            </button>
            <div className="flex gap-2">
              {fakeBankQrUrl && (
                <button
                  onClick={() => downloadQr(fakeBankQrUrl, "fake-bank-qr.png")}
                  className="btn-secondary flex-1 text-[11px] py-1.5 justify-center"
                >
                  <Download className="w-3 h-3" />
                  <span>Download QR</span>
                </button>
              )}
              <a
                href={fakeBankUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-[11px] py-1.5 px-2.5 justify-center"
                title="View Page Directly"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Card 2: Safe Merchant -> Expected SAFE 8/100 */}
        <div className="bg-[#F4FAF2] border-[2.5px] border-[#227010]/50 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="badge bg-[#EAF7E6] text-[#227010] border border-[#227010]/30 text-[10px] font-bold">
                AUTHENTIC DESTINATION
              </span>
              <span className="font-mono text-xs font-bold text-[#227010]">
                SAFE · 8/100
              </span>
            </div>

            <h4 className="font-display font-bold text-base text-ink mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#227010] shrink-0" />
              Safe Merchant QR
            </h4>
            <p className="text-[11px] text-muted mb-3">
              Genuine <strong>Sharma Kirana Store</strong>. NPCI verified gateway, zero credential forms.
            </p>

            {/* Scannable QR Code */}
            <div className="bg-white border-[2px] border-ink rounded-xl p-2.5 flex flex-col items-center justify-center mb-3 shadow-xs">
              {safeMerchantQrUrl ? (
                <img
                  src={safeMerchantQrUrl}
                  alt="Safe Merchant QR Code"
                  className="w-32 h-32 object-contain rounded"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center text-xs text-muted font-mono">
                  Generating QR...
                </div>
              )}
              <span className="text-[10px] font-mono text-muted mt-1.5 truncate max-w-[200px]">
                {safeMerchantUrl}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => onSelectTarget(safeMerchantUrl, "SAFE")}
              className="btn-primary w-full text-xs py-2.5 justify-center bg-[#227010] hover:bg-[#1A570C] text-white"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Inspect in Sandbox</span>
            </button>
            <div className="flex gap-2">
              {safeMerchantQrUrl && (
                <button
                  onClick={() => downloadQr(safeMerchantQrUrl, "safe-merchant-qr.png")}
                  className="btn-secondary flex-1 text-[11px] py-1.5 justify-center"
                >
                  <Download className="w-3 h-3" />
                  <span>Download QR</span>
                </button>
              )}
              <a
                href={safeMerchantUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-[11px] py-1.5 px-2.5 justify-center"
                title="View Page Directly"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
