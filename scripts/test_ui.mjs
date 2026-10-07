import { chromium } from "playwright";
import fs from "fs";

async function run() {
  console.log("Launching browser to validate Stage 1 UI...");
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  const errors = [];
  page.on("pageerror", (err) => {
    console.error("Page error:", err);
    errors.push(err.message);
  });
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error("Console error:", msg.text());
      errors.push(msg.text());
    }
  });

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // 1. Validate Scan Screen
  console.log("Validating Screen 1: Scan...");
  await page.waitForSelector("h1");
  const headline = await page.textContent("h1");
  console.log("Headline:", headline?.trim());
  if (!headline?.includes("Inspect") || !headline?.includes("before you interact")) {
    throw new Error(`Unexpected headline: ${headline}`);
  }

  // Check buttons
  const scanBtn = await page.locator("button:has-text('Scan QR')");
  const uploadBtn = await page.locator("button:has-text('Upload QR')");
  if ((await scanBtn.count()) === 0 || (await uploadBtn.count()) === 0) {
    throw new Error("Scan QR or Upload QR button missing!");
  }

  await page.screenshot({ path: "test_scan_desktop.png", fullPage: true });
  console.log("Saved test_scan_desktop.png");

  // Mobile viewport check
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "test_scan_mobile.png", fullPage: true });
  console.log("Saved test_scan_mobile.png");

  // Restore desktop
  await page.setViewportSize({ width: 1280, height: 900 });

  // 2. Validate Analyzing Screen
  console.log("Validating Screen 2: Analyzing...");
  await page.click("button:has-text('2. Analyzing')");
  await page.waitForSelector("h2:has-text('ANALYZING DESTINATION')");
  await page.waitForSelector("text=QR decoded");
  await page.waitForSelector("text=URL extracted");
  await page.waitForSelector("text=Security checks");
  await page.waitForSelector("text=Inspecting safely...");
  await page.screenshot({ path: "test_analyzing.png", fullPage: true });
  console.log("Saved test_analyzing.png");

  // 3. Validate Result Screen
  console.log("Validating Screen 3: Result...");
  await page.click("button:has-text('3. Result')");
  await page.waitForSelector("text=DANGER · HIGH RISK");
  await page.waitForSelector("text=87");
  await page.waitForSelector("text=Possible bank impersonation");
  await page.waitForSelector("text=WHY WE FLAGGED IT");
  await page.waitForSelector("text=Look-alike domain");
  await page.waitForSelector("text=Password requested");
  await page.waitForSelector("text=OTP requested");
  await page.waitForSelector("text=Redirect detected");
  await page.waitForSelector("text=[ Screenshot ]");
  await page.waitForSelector("button:has-text('[ DO NOT OPEN ]')");
  await page.screenshot({ path: "test_result_danger.png", fullPage: true });
  console.log("Saved test_result_danger.png");

  // Test Caution state
  console.log("Testing Caution state...");
  await page.click("button:has-text('Caution (48/100)')");
  await page.waitForSelector("text=CAUTION · MEDIUM RISK");
  await page.waitForSelector("text=48");
  await page.screenshot({ path: "test_result_caution.png", fullPage: true });
  console.log("Saved test_result_caution.png");

  // Test Safe state
  console.log("Testing Safe state...");
  await page.click("button:has-text('Safe (08/100)')");
  await page.waitForSelector("text=SAFE · LOW RISK");
  await page.waitForSelector("text=8");
  await page.screenshot({ path: "test_result_safe.png", fullPage: true });
  console.log("Saved test_result_safe.png");

  // Test Return to Scan Screen
  console.log("Testing Scan Another QR...");
  await page.click("button:has-text('Scan Another QR')");
  await page.waitForSelector("h1:has-text('Inspect')");
  console.log("Successfully returned to Scan screen!");

  await browser.close();

  if (errors.length > 0) {
    console.warn("Encountered console/page errors:", errors);
  } else {
    console.log("All UI tests passed with ZERO console or runtime errors!");
  }
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
