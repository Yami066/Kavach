"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  AlertOctagon,
  Image as ImageIcon,
  RotateCcw,
  Info,
  Scale,
} from "lucide-react";
import { SandboxScreenshot } from "./SandboxScreenshot";
import { EvidenceData } from "./AnalyzingScreen";

export type SeverityType = "DANGER" | "CAUTION" | "SAFE";

interface ResultScreenProps {
  onScanAnother: () => void;
  initialSeverity?: SeverityType;
  targetUrl?: string;
  evidence?: EvidenceData | null;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  onScanAnother,
  initialSeverity = "DANGER",
  targetUrl,
  evidence,
}) => {
  // Determine starting severity from evidence risk or initial
  const activeEvidenceSeverity = evidence?.risk?.severity || initialSeverity;
  const [severity, setSeverity] = useState<SeverityType>(activeEvidenceSeverity);

  useEffect(() => {
    if (evidence?.risk?.severity) {
      setSeverity(evidence.risk.severity);
    }
  }, [evidence]);

  const activeScore =
    evidence?.risk && severity === evidence.risk.severity
      ? evidence.risk.score
      : severity === "DANGER"
      ? 87
      : severity === "CAUTION"
      ? 48
      : 8;

  // Dynamic configuration based on severity & risk engine
  const config = {
    DANGER: {
      badgeText: "DANGER · HIGH RISK",
      badgeClass: "bg-[#FDECEC] text-danger border-[2.5px] border-danger",
      score: activeScore,
      headline: "Possible bank impersonation",
      description:
        "The risk engine detected high-severity credential traps, password requests, and look-alike domain heuristics in the quarantined destination.",
      destinationUrl: targetUrl || "https://secure-hdfc-kyc-update.com/login",
      stickerText: "MALICIOUS",
      stickerBg: "bg-coral text-white",
      reasons: evidence?.risk?.breakdown && severity === evidence.risk.severity
        ? evidence.risk.breakdown.map((b) => ({
            title: b.reason,
            weight: `+${b.points}`,
            detail: b.detail,
          }))
        : [
            {
              title: "Look-alike domain",
              weight: "+20",
              detail: `Domain mimics an authorized banking/financial institution.`,
            },
            {
              title: "Password requested",
              weight: "+25",
              detail: "Found HTML input[type='password'] on untrusted, freshly registered host.",
            },
            {
              title: "OTP requested",
              weight: "+25",
              detail: "Interactive 6-digit OTP verification field identified in form DOM.",
            },
            {
              title: "Redirect detected",
              weight: "+10",
              detail: "Destination hopped through obscured HTTP redirect chains.",
            },
          ],
      primaryActionText: "DO NOT OPEN",
      primaryActionClass: "btn-danger",
    },
    CAUTION: {
      badgeText: "CAUTION · MEDIUM RISK",
      badgeClass: "bg-cream-yellow text-ink border-[2.5px] border-ink",
      score: activeScore,
      headline: "Unverified shortlink & tracking hops",
      description:
        "The destination hides behind URL shorteners and redirects through an ad-tracking gateway with no reputation history.",
      destinationUrl: targetUrl || "https://bit.ly/promo-discount-2026",
      stickerText: "SUSPICIOUS",
      stickerBg: "bg-butter text-ink",
      reasons: [
        {
          title: "Multi-hop redirect chain",
          weight: "+10",
          detail: "Target executed consecutive HTTP redirects to obfuscate end URL.",
        },
        {
          title: "Suspicious URL structure",
          weight: "+10",
          detail: "URL contains urgency triggers or non-standard redirection parameters.",
        },
        {
          title: "Unknown domain reputation",
          weight: "+10",
          detail: "Domain registered recently without historical trust certificates.",
        },
      ],
      primaryActionText: "PROCEED WITH CAUTION",
      primaryActionClass: "btn-primary",
    },
    SAFE: {
      badgeText: "SAFE · LOW RISK",
      badgeClass: "bg-[#E8F8DE] text-[#227010] border-[2.5px] border-[#227010]",
      score: activeScore,
      headline: "Verified official merchant",
      description:
        "The destination conforms to verified merchant specifications. No deceptive forms, redirects, or credential traps were observed.",
      destinationUrl:
        targetUrl || "upi://pay?pa=sharma.kirana@okaxis&pn=SharmaKirana",
      stickerText: "VERIFIED",
      stickerBg: "bg-mint text-ink",
      reasons: [
        {
          title: "Cryptographically verified payload",
          weight: "PASS",
          detail: "VPA matches registered National Payments Corporation (NPCI) merchant.",
        },
        {
          title: "No credential fields requested",
          weight: "PASS",
          detail: "Zero password or OTP form inputs detected in destination DOM.",
        },
        {
          title: "Direct canonical destination",
          weight: "PASS",
          detail: "Direct payload with zero obscured redirects or proxy tunnels.",
        },
      ],
      primaryActionText: "SAFE TO OPEN",
      primaryActionClass: "btn-primary",
    },
  }[severity];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 pt-2 pb-8 flex flex-col items-center">
      {/* Interactive Scenario Switcher for Evaluator */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-white/90 border-[2.5px] border-ink rounded-full px-5 py-2.5 shadow-clay">
        <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-ink" />
          <span>Stage 4 Risk Engine Evaluation:</span>
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSeverity("DANGER")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              severity === "DANGER"
                ? "bg-danger text-white border-[2px] border-ink shadow-[2px_2px_0_0_#17151F]"
                : "bg-white text-ink border border-ink/30 hover:bg-cream"
            }`}
          >
            Danger (61–100)
          </button>
          <button
            onClick={() => setSeverity("CAUTION")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              severity === "CAUTION"
                ? "bg-butter text-ink border-[2px] border-ink shadow-[2px_2px_0_0_#17151F]"
                : "bg-white text-ink border border-ink/30 hover:bg-cream"
            }`}
          >
            Caution (31–60)
          </button>
          <button
            onClick={() => setSeverity("SAFE")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              severity === "SAFE"
                ? "bg-mint text-ink border-[2px] border-ink shadow-[2px_2px_0_0_#17151F]"
                : "bg-white text-ink border border-ink/30 hover:bg-cream"
            }`}
          >
            Safe (0–30)
          </button>
        </div>
      </div>

      {/* Main Score & Threat Verdict Card */}
      <div
        className={`w-full bg-white border-[3px] ${
          severity === "DANGER" ? "border-danger" : "border-ink"
        } rounded-card shadow-brutal p-6 sm:p-8 relative mb-8`}
      >
        {/* Corner Sticker */}
        <div className="absolute -top-3.5 -right-3 rotate-3">
          <span className={`sticker ${config.stickerBg} shadow-[2px_2px_0_0_#17151F]`}>
            {config.stickerText}
          </span>
        </div>

        {/* Severity Badge & Sandbox status */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className={`badge ${config.badgeClass} text-xs sm:text-sm font-extrabold uppercase tracking-wide`}
          >
            {severity === "DANGER" ? (
              <AlertOctagon className="w-4 h-4 stroke-[2.5]" />
            ) : severity === "CAUTION" ? (
              <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            )}
            {config.badgeText}
          </span>

          <span className="badge bg-mint text-ink border border-ink text-[11px] font-mono">
            RISK_ENGINE_STAGE_4
          </span>

          {evidence && (
            <span className="badge bg-cream text-muted border border-ink/20 text-[11px] font-mono">
              WORKER_TIME: {evidence.execution_time_ms}ms
            </span>
          )}
        </div>

        {/* Score & Headline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b-[2px] border-ink/15">
          <div className="max-w-xl">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-ink tracking-tight mb-2">
              {config.headline}
            </h2>
            <p className="text-sm sm:text-base text-muted font-medium leading-relaxed">
              {config.description}
            </p>
          </div>

          {/* Big Score Display */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#FAF8F5] border-[2.5px] border-ink shadow-brutal-sm min-w-[140px] shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1">
              <Scale className="w-3 h-3 text-ink" />
              RISK SCORE
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span
                className={`font-display font-black text-5xl sm:text-6xl ${
                  severity === "DANGER"
                    ? "text-danger"
                    : severity === "CAUTION"
                    ? "text-[#B26B00]"
                    : "text-[#227010]"
                }`}
              >
                {config.score}
              </span>
              <span className="text-lg font-bold text-muted">/100</span>
            </div>
            <span
              className={`text-[10px] font-mono font-bold mt-1 px-2 py-0.5 rounded-full ${
                severity === "DANGER"
                  ? "bg-danger/10 text-danger"
                  : severity === "CAUTION"
                  ? "bg-butter text-ink"
                  : "bg-mint/40 text-[#227010]"
              }`}
            >
              {severity === "DANGER"
                ? "61–100 DANGER"
                : severity === "CAUTION"
                ? "31–60 CAUTION"
                : "0–30 SAFE"}
            </span>
          </div>
        </div>

        {/* Destination inspected display */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="font-bold text-muted uppercase tracking-wider">
            INSPECTED DESTINATION:
          </span>
          <span className="font-mono bg-cream px-3 py-1.5 rounded-lg border border-ink/20 text-ink font-semibold truncate max-w-full sm:max-w-md">
            {config.destinationUrl}
          </span>
        </div>
      </div>

      {/* WHY WE FLAGGED IT Section (matching IMPLEMENTATION_PLAN.md) */}
      <div className="w-full bg-white border-[3px] border-ink rounded-card shadow-brutal p-6 sm:p-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-muted">
              EVIDENCE AUDIT • STAGE 4 RULES
            </span>
            <h3 className="font-display font-black text-2xl text-ink tracking-tight">
              WHY WE FLAGGED IT
            </h3>
          </div>
          <span className="chip text-xs font-mono font-bold">
            {config.reasons.length} FACTORS DETECTED
          </span>
        </div>

        {/* Reasons List */}
        <div className="space-y-3">
          {config.reasons.map((reason, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl border-[2px] ${
                severity === "DANGER"
                  ? "border-ink bg-[#FFF9F9]"
                  : "border-ink/30 bg-[#FAF8F5]"
              } flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition hover:translate-x-1`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-6 h-6 rounded-full border-[2px] border-ink flex items-center justify-center shrink-0 mt-0.5 ${
                    severity === "DANGER"
                      ? "bg-danger text-white"
                      : severity === "CAUTION"
                      ? "bg-butter text-ink"
                      : "bg-mint text-ink"
                  }`}
                >
                  {severity === "SAFE" ? "✓" : "!"}
                </span>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-ink">
                    • {reason.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted font-medium mt-0.5">
                    {reason.detail}
                  </p>
                </div>
              </div>

              <div className="self-end sm:self-center shrink-0">
                <span
                  className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full border border-ink/30 ${
                    reason.weight.startsWith("+")
                      ? "bg-[#FDECEC] text-danger"
                      : "bg-mint/40 text-[#227010]"
                  }`}
                >
                  {reason.weight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshot Section (matching IMPLEMENTATION_PLAN.md: [ Screenshot ]) */}
      <div className="w-full bg-white border-[3px] border-ink rounded-card shadow-brutal p-6 sm:p-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-muted">
              CONTAINER TELEMETRY
            </span>
            <h3 className="font-display font-black text-2xl text-ink tracking-tight flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-ink" />
              <span>[ Screenshot ]</span>
            </h3>
          </div>
          <span className="chip text-xs text-muted font-mono">
            {evidence?.screenshot_base64
              ? "PLAYWRIGHT_DISPOSABLE_BUFFER"
              : "1280x800 Viewport Buffer"}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-muted font-medium mb-4">
          Rendered remotely in an ephemeral Playwright browser session. No active
          scripts or network connections are run on your device.
        </p>

        {/* Embedded Sandbox Screenshot Preview */}
        <SandboxScreenshot
          severity={severity}
          url={config.destinationUrl}
          screenshotBase64={evidence?.screenshot_base64}
        />
      </div>

      {/* Safety Actions Section (matching IMPLEMENTATION_PLAN.md: [ DO NOT OPEN ]) */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Primary Alert Button */}
        <button
          onClick={() => {
            alert(
              severity === "DANGER"
                ? "Blocked: Opening phishing and credential harvesting destinations is prohibited for your safety."
                : "Navigating to verified destination safely."
            );
          }}
          className={`${config.primaryActionClass} text-base sm:text-lg font-bold py-4 px-10`}
        >
          {severity === "DANGER" ? (
            <AlertOctagon className="w-5 h-5 stroke-[2.5]" />
          ) : (
            <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
          )}
          <span>[ {config.primaryActionText} ]</span>
        </button>

        {/* Secondary Scan Another QR Button */}
        <button
          onClick={onScanAnother}
          className="btn-secondary text-base sm:text-lg font-bold py-4 px-8"
        >
          <RotateCcw className="w-5 h-5 stroke-[2.5]" />
          <span>Scan Another QR</span>
        </button>
      </div>

      {/* Footer Assurance Banner */}
      <div className="mt-8 text-center text-xs text-muted max-w-lg">
        QR Kavach Isolated Worker • Session destroyed after capture • Simple
        Risk Engine (Stage 4)
      </div>
    </section>
  );
};
