"use client";

import React, { useRef, useState } from "react";
import QRCode from "qrcode";
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
  Camera,
  X,
  FileImage,
} from "lucide-react";
import { CameraScanner } from "./CameraScanner";
import { DestinationCard } from "./DestinationCard";
import { DemoQrCards } from "./DemoQrCards";
import { FeaturesShowcase } from "./FeaturesShowcase";
import { decodeQRFromFile } from "@/lib/qrDecoder";

interface ScanScreenProps {
  onInspectDestination: (url: string, severity?: "DANGER" | "CAUTION" | "SAFE") => void;
}

export const ScanScreen: React.FC<ScanScreenProps> = ({
  onInspectDestination,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [detectedUrl, setDetectedUrl] = useState<string | null>(null);
  const [detectedSeverity, setDetectedSeverity] = useState<"DANGER" | "CAUTION" | "SAFE">("DANGER");
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Handle successful live camera scan
  const handleCameraSuccess = (data: string) => {
    setIsCameraActive(false);
    setDetectedUrl(data);
    if (data.includes("hdfc") || data.includes("bank") || data.includes("login")) {
      setDetectedSeverity("DANGER");
    } else if (data.includes("bit.ly") || data.includes("promo")) {
      setDetectedSeverity("CAUTION");
    } else {
      setDetectedSeverity("SAFE");
    }
  };

  // Handle file upload and decode via jsQR
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingFile(true);
      setUploadError(null);
      const result = await decodeQRFromFile(file);

      if (result.success && result.rawText) {
        setDetectedUrl(result.rawText);
        if (result.rawText.includes("hdfc") || result.rawText.includes("bank")) {
          setDetectedSeverity("DANGER");
        } else if (result.rawText.includes("bit.ly") || result.rawText.includes("promo")) {
          setDetectedSeverity("CAUTION");
        } else {
          setDetectedSeverity("SAFE");
        }
      } else {
        setUploadError(
          result.error || "No valid QR code could be found in the uploaded image. Please try another image."
        );
      }
    } catch (err: any) {
      setUploadError("Error decoding image: " + (err?.message || "Unknown error"));
    } finally {
      setIsProcessingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Generate and decode sample QR codes to demonstrate real decoding
  const handleSampleSelect = async (
    url: string,
    severity: "DANGER" | "CAUTION" | "SAFE"
  ) => {
    try {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setIsProcessingFile(true);
      setUploadError(null);
      // Generate real QR Data URL
      const dataUrl = await QRCode.toDataURL(url, { width: 300, margin: 2 });

      // Create image element and decode using jsQR to prove full loop
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { default: jsQR } = await import("jsqr");
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code && code.data) {
          setDetectedUrl(code.data);
          setDetectedSeverity(severity);
        } else {
          setDetectedUrl(url);
          setDetectedSeverity(severity);
        }
      }
    } catch {
      setDetectedUrl(url);
      setDetectedSeverity(severity);
    } finally {
      setIsProcessingFile(false);
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
            STAGE 2 LIVE
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

      {/* Conditional: If Destination Detected -> Show DestinationCard */}
      {detectedUrl ? (
        <div className="w-full mb-8">
          <DestinationCard
            decodedUrl={detectedUrl}
            onInspect={(url) => onInspectDestination(url, detectedSeverity)}
            onScanAnother={() => {
              setDetectedUrl(null);
              setIsCameraActive(false);
            }}
          />
        </div>
      ) : (
        /* Main Scanner Container Card */
        <div className="w-full max-w-md bg-white border-[3px] border-ink rounded-card shadow-brutal p-6 sm:p-8 relative mb-8">
          {/* Floating Sticker */}
          <div className="absolute -top-3.5 -right-3 rotate-6">
            <span className="sticker bg-butter text-ink shadow-[2px_2px_0_0_#17151F]">
              REAL QR DECODER
            </span>
          </div>

          {/* Viewfinder / Camera Area */}
          {isCameraActive ? (
            <div className="mb-6">
              <CameraScanner
                onScanSuccess={handleCameraSuccess}
                onCancel={() => setIsCameraActive(false)}
              />
            </div>
          ) : (
            <div
              onClick={() => setIsCameraActive(true)}
              className="relative w-full aspect-square max-h-[300px] bg-[#FAF8F5] border-[2.5px] border-dashed border-ink/40 rounded-[22px] flex flex-col items-center justify-center overflow-hidden mb-6 group cursor-pointer hover:border-ink transition"
            >
              {/* Viewfinder Corners */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-[3px] border-l-[3px] border-ink rounded-tl" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-[3px] border-r-[3px] border-ink rounded-tr" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-[3px] border-l-[3px] border-ink rounded-bl" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-[3px] border-r-[3px] border-ink rounded-br" />

              {/* Animated Laser Beam */}
              <div className="animate-laser" />

              {/* QR Graphic Silhouette */}
              <div className="w-36 h-36 border-[3px] border-ink/80 rounded-2xl p-2.5 bg-white shadow-clay flex flex-col justify-between group-hover:scale-105 transition-transform">
                <div className="flex justify-between">
                  <div className="w-8 h-8 border-[3px] border-ink bg-ink/10 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-ink rounded-sm" />
                  </div>
                  <div className="w-8 h-8 border-[3px] border-ink bg-ink/10 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-ink rounded-sm" />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-butter border-[2px] border-ink flex items-center justify-center shadow-xs">
                    <Camera className="w-5 h-5 text-ink stroke-[2.5]" />
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

              <p className="mt-4 text-xs font-bold text-ink uppercase tracking-wider group-hover:underline">
                Tap to Start Live Camera Scanner
              </p>
            </div>
          )}

          {/* Upload Error Alert */}
          {uploadError && (
            <div className="mb-4 p-3 bg-[#FDECEC] border-[2px] border-danger rounded-xl flex items-start gap-2.5 text-xs text-danger font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1">{uploadError}</div>
              <button onClick={() => setUploadError(null)}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Primary Scan Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsCameraActive((prev) => !prev)}
              className="btn-primary w-full text-base font-bold py-3.5 text-center justify-center"
            >
              <Scan className="w-5 h-5 stroke-[2.5]" />
              <span>{isCameraActive ? "Close Camera" : "Scan QR"}</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <button
              disabled={isProcessingFile}
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary w-full text-base font-bold py-3 text-center justify-center disabled:opacity-50"
            >
              <Upload className="w-5 h-5 stroke-[2.5]" />
              <span>{isProcessingFile ? "Decoding Image..." : "Upload QR"}</span>
            </button>
          </div>

          {/* Stage 2 Live Decoded Test QRs */}
          <div className="mt-6 pt-5 border-t-[2px] border-ink/10">
            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-ink" />
              <span>Live Test Scenarios (Auto-decodes with jsQR):</span>
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  handleSampleSelect(
                    "https://secure-hdfc-kyc-update.com/login",
                    "DANGER"
                  )
                }
                className="chip w-full justify-between text-xs py-2 hover:bg-cream-yellow transition text-left"
              >
                <span className="font-semibold text-ink flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-danger" />
                  Phishing Bank QR (Fake HDFC KYC)
                </span>
                <span className="font-mono text-[10px] text-danger font-bold">
                  DANGER
                </span>
              </button>
              <button
                onClick={() =>
                  handleSampleSelect(
                    "https://bit.ly/promo-discount-2026",
                    "CAUTION"
                  )
                }
                className="chip w-full justify-between text-xs py-2 hover:bg-cream-yellow transition text-left"
              >
                <span className="font-semibold text-ink flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#B26B00]" />
                  Obfuscated Shortlink (bit.ly redirect)
                </span>
                <span className="font-mono text-[10px] text-[#B26B00] font-bold">
                  CAUTION
                </span>
              </button>
              <button
                onClick={() =>
                  handleSampleSelect(
                    "upi://pay?pa=sharma.kirana@okaxis&pn=SharmaKirana",
                    "SAFE"
                  )
                }
                className="chip w-full justify-between text-xs py-2 hover:bg-mint/40 transition text-left"
              >
                <span className="font-semibold text-ink flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#227010]" />
                  Clean Merchant QR (Sharma Kirana)
                </span>
                <span className="font-mono text-[10px] text-[#227010] font-bold">
                  SAFE
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stage 5 Demo Target Scannable QRs */}
      <DemoQrCards
        onSelectTarget={handleSampleSelect}
        onDirectInspect={onInspectDestination}
      />

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

      {/* Interactive Feature Radar / Circles Section */}
      <FeaturesShowcase />

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
