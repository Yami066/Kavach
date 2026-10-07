"use client";

import React, { useState } from "react";
import { Navbar, ScreenMode } from "@/components/Navbar";
import { ScanScreen } from "@/components/ScanScreen";
import { AnalyzingScreen, EvidenceData } from "@/components/AnalyzingScreen";
import { ResultScreen, SeverityType } from "@/components/ResultScreen";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>("scan");
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityType>("DANGER");
  const [targetUrl, setTargetUrl] = useState<string>(
    "https://secure-hdfc-kyc-update.com/login"
  );
  const [evidenceData, setEvidenceData] = useState<EvidenceData | null>(null);

  const handleInspectDestination = (
    url: string,
    severity: "DANGER" | "CAUTION" | "SAFE" = "DANGER"
  ) => {
    setTargetUrl(url);
    setSelectedSeverity(severity);
    setEvidenceData(null);
    setCurrentScreen("analyzing");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-butter selection:text-ink">
      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-start py-6 pt-4 max-w-5xl mx-auto w-full">
        {currentScreen === "scan" && (
          <ScanScreen onInspectDestination={handleInspectDestination} />
        )}

        {currentScreen === "analyzing" && (
          <AnalyzingScreen
            targetUrl={targetUrl}
            onComplete={(evidence) => {
              if (evidence) {
                setEvidenceData(evidence);
              }
              setCurrentScreen("result");
            }}
            onCancel={() => setCurrentScreen("scan")}
          />
        )}

        {currentScreen === "result" && (
          <ResultScreen
            initialSeverity={selectedSeverity}
            targetUrl={targetUrl}
            evidence={evidenceData}
            onScanAnother={() => {
              setEvidenceData(null);
              setCurrentScreen("scan");
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 border-t-[2.5px] border-ink/15 text-center mt-12 bg-white/40">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-muted">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-butter border border-ink" />
            <span className="text-ink font-bold font-display">QR KAVACH</span>
            <span>— Pre-Interaction Threat Interceptor</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>FastAPI + Playwright Sandbox</span>
            <span>•</span>
            <span>Disposable Container Isolation</span>
            <span>•</span>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-ink/20">
              STAGE_6_COMPLETE
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
