// Stage 5 Automated Verification Script
// Tests both Demo Targets (Fake Bank and Safe Merchant) via Playwright Sandbox & Risk Engine

async function runStage5Tests() {
  console.log("=== STAGE 5 VERIFICATION STARTING ===");

  const targets = [
    {
      name: "Fake Bank Demo Target (Phishing)",
      url: "http://127.0.0.1:3000/demo/fake-bank-login",
      expectedSeverity: "DANGER",
      expectedScore: 87,
      requiredReasons: [
        "Look-alike domain",
        "Password requested",
        "OTP requested",
        "Redirect detected",
      ],
      expectScreenshot: true,
      expectPassword: true,
      expectOtp: true,
    },
    {
      name: "Safe Merchant Demo Target (BharatQR)",
      url: "http://127.0.0.1:3000/demo/safe-merchant",
      expectedSeverity: "SAFE",
      expectedScore: 8,
      requiredReasons: [
        "Verified destination",
        "Zero credential or OTP inputs detected",
      ],
      expectScreenshot: true,
      expectPassword: false,
      expectOtp: false,
    },
  ];

  let allPassed = true;

  for (const t of targets) {
    console.log(`\n-----------------------------------------`);
    console.log(`Testing: ${t.name}`);
    console.log(`Target URL: ${t.url}`);

    const res = await fetch("http://127.0.0.1:8000/inspect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: t.url }),
    });

    if (!res.ok) {
      console.error(`❌ HTTP Error ${res.status}: ${await res.text()}`);
      allPassed = false;
      continue;
    }

    const data = await res.json();
    console.log(`Page Title: "${data.page_title}"`);
    console.log(`Execution Time: ${data.execution_time_ms}ms`);
    console.log(`Sandbox Destroyed: ${data.sandbox_destroyed}`);
    console.log(`Has Password Field: ${data.has_password_field}`);
    console.log(`Has OTP Field: ${data.has_otp_field}`);
    console.log(`Redirects Count: ${data.redirect_count}`);
    console.log(`Risk Score: ${data.risk.score} / 100`);
    console.log(`Risk Severity: ${data.risk.severity}`);
    console.log(`Reasons:`, data.risk.reasons);
    console.log(`Screenshot Captured: ${Boolean(data.screenshot_base64 && data.screenshot_base64.length > 500)}`);

    // Validations
    let targetPassed = true;

    if (data.risk.severity !== t.expectedSeverity) {
      console.error(`❌ Expected severity ${t.expectedSeverity}, got ${data.risk.severity}`);
      targetPassed = false;
    }

    if (t.expectedScore && data.risk.score !== t.expectedScore) {
      console.error(`❌ Expected score ${t.expectedScore}, got ${data.risk.score}`);
      targetPassed = false;
    }

    if (data.has_password_field !== t.expectPassword) {
      console.error(`❌ Expected password field = ${t.expectPassword}, got ${data.has_password_field}`);
      targetPassed = false;
    }

    if (data.has_otp_field !== t.expectOtp) {
      console.error(`❌ Expected OTP field = ${t.expectOtp}, got ${data.has_otp_field}`);
      targetPassed = false;
    }

    if (t.expectScreenshot && (!data.screenshot_base64 || data.screenshot_base64.length < 500)) {
      console.error(`❌ Expected valid screenshot, but received empty screenshot`);
      targetPassed = false;
    }

    for (const reqReason of t.requiredReasons) {
      if (!data.risk.reasons.includes(reqReason)) {
        console.error(`❌ Missing required reason: "${reqReason}"`);
        targetPassed = false;
      }
    }

    if (targetPassed) {
      console.log(`✅ ${t.name} PASSED ALL SPEC CHECKS!`);
    } else {
      console.error(`❌ ${t.name} FAILED CHECKS.`);
      allPassed = false;
    }
  }

  console.log(`\n=========================================`);
  if (allPassed) {
    console.log("🎉 ALL STAGE 5 SPECIFICATIONS VERIFIED SUCCESSFULLY!");
    process.exit(0);
  } else {
    console.error("❌ STAGE 5 VERIFICATION FAILED.");
    process.exit(1);
  }
}

runStage5Tests().catch((err) => {
  console.error("Fatal error running test:", err);
  process.exit(1);
});
