import React from "react";
import { CheckCircle2, ShieldCheck, QrCode, Store, Building2, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Sharma General Store - Verified Merchant",
  description: "Official Verified Merchant Payment Gateway via NPCI BharatQR",
};

export default function SafeMerchantPage() {
  return (
    <div className="min-h-screen bg-[#F4F9F2] text-slate-800 font-sans flex flex-col justify-between p-4 sm:p-6">
      {/* Simulation banner */}
      <div className="max-w-xl mx-auto w-full mb-4 bg-emerald-100 border border-emerald-300 rounded-lg p-2.5 text-xs text-emerald-900 flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          VERIFIED MERCHANT TARGET · STAGE 5 DEMO
        </span>
        <span className="text-[11px] bg-emerald-200 px-2 py-0.5 rounded font-mono text-emerald-800">
          GENUINE DESTINATION
        </span>
      </div>

      <div className="max-w-md mx-auto w-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden my-auto">
        {/* Merchant Header */}
        <div className="bg-[#1E5631] text-white p-5 flex items-center justify-between border-b-4 border-[#B9E4A1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Sharma Kirana & General Store</h1>
              <p className="text-xs text-emerald-200">Registered Local Retail Merchant</p>
            </div>
          </div>
          <span className="text-[11px] font-mono bg-white/20 px-2 py-1 rounded text-white font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#B9E4A1]" /> NPCI VERIFIED
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="text-center py-4 bg-emerald-50 rounded-xl border border-emerald-100 mb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 text-emerald-700">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-base font-bold text-emerald-950">Safe & Authentic Destination</h2>
            <p className="text-xs text-emerald-700 mt-1 max-w-xs mx-auto">
              This terminal is registered with BharatQR & NPCI Unified Payments Interface.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Merchant Legal Name:</span>
              <span className="font-bold text-slate-800">Sharma Kirana Stores Pvt Ltd</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">UPI VPA:</span>
              <span className="font-mono font-bold text-slate-800">sharma.kirana@okaxis</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Terminal ID:</span>
              <span className="font-mono text-slate-600">MUM-T992019-B</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Credential Requests:</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> None (Zero passwords/OTP)
              </span>
            </div>
          </div>

          <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <p className="text-xs text-slate-600">
              Pay securely via any BHIM, Google Pay, PhonePe or Bank UPI app.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <Building2 className="w-3.5 h-3.5 text-slate-600" />
            Settlement Bank: Axis Bank
          </span>
          <span className="text-emerald-700 font-semibold">Tier-1 Trusted</span>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 mt-4">
        QR Kavach Sandbox Test Harness · Verified Merchant Comparison
      </div>
    </div>
  );
}
