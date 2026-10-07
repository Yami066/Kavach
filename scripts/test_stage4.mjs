import { chromium } from "playwright";

async function run() {
  console.log("=== Testing Stage 4: Simple Risk Engine ===");

  // 1. Direct API Test on FastAPI /risk-score
  console.log("Testing POST /risk-score with fake banking parameters...");
  const riskRes = await fetch("http://127.0.0.1:8000/risk-score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: "https://secure-hdfc-kyc-update.com/login",
      has_password_field: true,
      has_otp_field: true,
      redirect_count: 1,
      forms_detected: 1,
    }),
  });

  if (!riskRes.ok) {
    throw new Error(`Risk score request failed: ${riskRes.status}`);
  }

  const riskData = await riskRes.json();
  console.log("Stage 4 Risk Engine Output:", riskData);

  if (riskData.severity !== "DANGER") {
    throw new Error(`Expected severity DANGER, got ${riskData.severity}`);
  }
  if (riskData.score < 61) {
    throw new Error(`Expected score > 60 for DANGER, got ${riskData.score}`);
  }
  console.log("Score verified in DANGER tier (61-100):", riskData.score);
  console.log("Reasons:", riskData.reasons);

  // 2. Test CAUTION tier (e.g. shortlink with redirects and unknown domain)
  console.log("Testing Caution tier calculation...");
  const cautionRes = await fetch("http://127.0.0.1:8000/risk-score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: "https://bit.ly/promo-291",
      has_password_field: false,
      has_otp_field: false,
      redirect_count: 2,
    }),
  });
  const cautionData = await cautionRes.json();
  console.log("Caution Output:", cautionData);
  if (cautionData.severity !== "CAUTION") {
    throw new Error(`Expected severity CAUTION, got ${cautionData.severity}`);
  }

  // 3. Test SAFE tier (e.g. clean UPI merchant)
  console.log("Testing Safe tier calculation...");
  const safeRes = await fetch("http://127.0.0.1:8000/risk-score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: "upi://pay?pa=sharma.kirana@okaxis&pn=SharmaKirana",
      has_password_field: false,
      has_otp_field: false,
      redirect_count: 0,
    }),
  });
  const safeData = await safeRes.json();
  console.log("Safe Output:", safeData);
  if (safeData.severity !== "SAFE") {
    throw new Error(`Expected severity SAFE, got ${safeData.severity}`);
  }

  // 4. Test UI Integration in Chromium
  console.log("Testing UI rendering of Stage 4 Risk Engine results in browser...");
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Test Phishing Bank scenario
  await page.click("text=Phishing Bank QR");
  await page.waitForSelector("h2:has-text('Destination detected')");
  await page.click("button:has-text('[ Inspect destination ]')");

  // Wait for Result screen
  await page.waitForSelector("h3:has-text('WHY WE FLAGGED IT')", { timeout: 25000 });
  await page.waitForSelector("text=RISK_ENGINE_STAGE_4");
  await page.waitForSelector("text=DANGER · HIGH RISK");
  await page.waitForSelector("text=Password requested");
  await page.waitForSelector("text=OTP requested");
  await page.waitForSelector("text=Look-alike domain");

  await page.screenshot({ path: "test_stage4_result_danger.png", fullPage: true });
  console.log("Saved test_stage4_result_danger.png");

  // Test Caution view
  await page.click("button:has-text('Caution (31–60)')");
  await page.waitForSelector("text=CAUTION · MEDIUM RISK");
  await page.screenshot({ path: "test_stage4_result_caution.png", fullPage: true });
  console.log("Saved test_stage4_result_caution.png");

  // Test Safe view
  await page.click("button:has-text('Safe (0–30)')");
  await page.waitForSelector("text=SAFE · LOW RISK");
  await page.screenshot({ path: "test_stage4_result_safe.png", fullPage: true });
  console.log("Saved test_stage4_result_safe.png");

  await browser.close();
  console.log("=== All Stage 4 tests PASSED successfully! ===");
}

run().catch((err) => {
  console.error("Stage 4 test failed:", err);
  process.exit(1);
});
