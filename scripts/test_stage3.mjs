import { chromium } from "playwright";
import fs from "fs";

async function run() {
  console.log("=== Testing Stage 3: FastAPI Backend + Playwright Sandbox ===");

  // 1. Verify FastAPI Health
  console.log("Checking FastAPI backend health on http://127.0.0.1:8000/health...");
  const healthRes = await fetch("http://127.0.0.1:8000/health");
  if (!healthRes.ok) {
    throw new Error(`FastAPI health check failed: ${healthRes.status}`);
  }
  const healthData = await healthRes.json();
  console.log("FastAPI Health:", healthData);

  // 2. Direct Sandbox Inspection API Test
  console.log("Testing POST /inspect on FastAPI with sample target...");
  const inspectRes = await fetch("http://127.0.0.1:8000/inspect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: "https://example.com" }),
  });
  if (!inspectRes.ok) {
    throw new Error(`FastAPI /inspect failed: ${inspectRes.status}`);
  }
  const inspectData = await inspectRes.json();
  console.log("Sandbox Inspection Results:");
  console.log(`- Final URL: ${inspectData.final_url}`);
  console.log(`- Domain: ${inspectData.domain}`);
  console.log(`- Redirects: ${inspectData.redirect_count}`);
  console.log(`- Forms detected: ${inspectData.forms_detected}`);
  console.log(`- Execution time: ${inspectData.execution_time_ms}ms`);
  console.log(`- Sandbox destroyed clean: ${inspectData.sandbox_destroyed}`);
  console.log(`- Screenshot base64 length: ${inspectData.screenshot_base64?.length || 0}`);

  if (!inspectData.sandbox_destroyed) {
    throw new Error("Sandbox was not destroyed cleanly!");
  }
  if (!inspectData.screenshot_base64) {
    throw new Error("No screenshot captured by Playwright worker!");
  }

  // 3. Test Full UI End-to-End in Chromium
  console.log("Launching browser to test full UI -> Next.js -> FastAPI flow...");
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  page.on("pageerror", (err) => console.error("Page error:", err));
  page.on("console", (msg) => {
    if (msg.type() === "error") console.error("Console error:", msg.text());
  });

  console.log("Opening http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Click Phishing Bank scenario
  console.log("Selecting Phishing Bank QR scenario...");
  await page.click("text=Phishing Bank QR");

  // Destination detected appears
  await page.waitForSelector("h2:has-text('Destination detected')");
  console.log("Destination detected card active.");

  // Click Inspect destination
  console.log("Clicking [ Inspect destination ] to dispatch to FastAPI Sandbox...");
  await page.click("button:has-text('[ Inspect destination ]')");

  // Verify Analyzing screen displays FastAPI telemetry
  await page.waitForSelector("h2:has-text('ANALYZING DESTINATION')");
  await page.waitForSelector("text=FASTAPI_WORKER_ACTIVE");
  console.log("Analyzing screen streaming live FastAPI telemetry!");

  await page.screenshot({ path: "test_stage3_analyzing_fastapi.png", fullPage: true });
  console.log("Saved test_stage3_analyzing_fastapi.png");

  // Wait for Result screen (inspection takes ~3-5s)
  console.log("Waiting for sandbox inspection result...");
  await page.waitForSelector("h3:has-text('WHY WE FLAGGED IT')", { timeout: 25000 });
  await page.waitForSelector("text=SANDBOX_DESTROYED_CLEAN");
  console.log("Result screen successfully rendered with sandbox evidence!");

  await page.screenshot({ path: "test_stage3_result_evidence.png", fullPage: true });
  console.log("Saved test_stage3_result_evidence.png");

  await browser.close();
  console.log("=== All Stage 3 tests PASSED successfully! ===");
}

run().catch((err) => {
  console.error("Stage 3 test failed:", err);
  process.exit(1);
});
