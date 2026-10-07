"use client";

import React, { useEffect } from "react";
import { Lock, ShieldAlert, KeyRound, Smartphone, Landmark, ArrowRight, ShieldCheck } from "lucide-react";

export default function FakeBankPage() {
  useEffect(() => {
    document.title = "Secure Bank - NetBanking Portal";
  }, []);
  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-800 font-sans flex flex-col justify-between p-4 sm:p-6">
      {/* Simulation banner */}
      <div className="max-w-xl mx-auto w-full mb-4 bg-amber-100 border border-amber-300 rounded-lg p-2.5 text-xs text-amber-900 flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono font-semibold">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          SIMULATION TARGET · STAGE 5 DEMO HARNESS
        </span>
        <span className="text-[11px] bg-amber-200 px-2 py-0.5 rounded font-mono">
          DO NOT ENTER REAL CREDENTIALS
        </span>
      </div>

      <div className="max-w-md mx-auto w-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden my-auto">
        {/* Bank Header */}
        <div className="bg-[#0A3D62] text-white p-5 flex items-center justify-between border-b-4 border-[#F39C12]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Secure Bank</h1>
              <p className="text-xs text-blue-200">Personal & Corporate NetBanking</p>
            </div>
          </div>
          <span className="text-[11px] font-mono bg-white/15 px-2 py-1 rounded text-white font-medium flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#F39C12]" /> 256-BIT SSL
          </span>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="mb-5 pb-4 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">Sign in to your Account</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Please enter your banking credentials and current OTP to continue.
            </p>
          </div>

          <form action="#" method="POST" className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Customer ID */}
            <div>
              <label htmlFor="customer_id" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Customer ID / User ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="customer_id"
                  name="customer_id"
                  required
                  placeholder="e.g. 84920419"
                  defaultValue="84920419"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  NetBanking Password
                </label>
                <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="••••••••••••"
                  defaultValue="hunter2!Secret"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50 font-mono"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
            </div>

            {/* OTP Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="otp" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  One-Time Password (OTP)
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  Sent to +91 98*** **321
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  required
                  placeholder="Enter 6-digit OTP (e.g. 491028)"
                  defaultValue="491028"
                  maxLength={6}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/50 font-mono tracking-widest text-base font-semibold"
                />
                <Smartphone className="w-4 h-4 text-amber-600 absolute right-3 top-3" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Security requirement: Never share OTP with bank executives.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="login-button"
                className="w-full bg-[#0A3D62] hover:bg-[#072F4A] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg"
              >
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Security Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified SSL Certificate
          </span>
          <span>Helpdesk: 1800-000-000</span>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 mt-4">
        QR Kavach Sandbox Test Harness · Controlled Phishing Simulation
      </div>
    </div>
  );
}
