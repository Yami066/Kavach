import { chromium } from "playwright";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

async function run() {
  console.log("=== Testing Stage 2: Real QR Scanning & URL Extraction ===");

  // 1. Generate a real physical QR code image file to test upload & decoding
  const testUrl = "https://suspicious-fake-bank.net/kyc-update";
  const qrImagePath = path.resolve("./test_qr_code.png");
  await QRCode.toFile(qrImagePath, testUrl, {
    width: 400,
    margin: 2,
    color: { dark: "#17151F", light: "#FFFFFF" },
  });
  console.log(`Generated real test QR image at: ${qrImagePath}`);

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

  // Verify Scan Screen
  await page.waitForSelector("h1:has-text('Inspect')");
  console.log("Scan screen active.");

  // Test 1: Upload real QR image file
  console.log("Uploading test QR image file to trigger jsQR decoding...");
  const fileInput = await page.locator("input[type='file']");
  await fileInput.setInputFiles(qrImagePath);

  // Verify Destination Detected card appears
  console.log("Waiting for 'Destination detected' card...");
  await page.waitForSelector("h2:has-text('Destination detected')");
  await page.waitForSelector(`text=${testUrl}`);
  await page.waitForSelector("button:has-text('[ Inspect destination ]')");

  await page.screenshot({ path: "test_stage2_destination_detected.png", fullPage: true });
  console.log("Saved test_stage2_destination_detected.png");

  // Verify the URL was NOT opened automatically
  const currentUrl = page.url();
  console.log("Current page URL (must still be on localhost:3000):", currentUrl);
  if (!currentUrl.includes("localhost:3000")) {
    throw new Error(`CRITICAL SECURITY FAILURE: URL was opened automatically to ${currentUrl}`);
  }

  // Test 2: Click [ Inspect destination ]
  console.log("Clicking [ Inspect destination ] button...");
  await page.click("button:has-text('[ Inspect destination ]')");

  // Verify it transitions to Analyzing screen with the decoded target URL
  await page.waitForSelector("h2:has-text('ANALYZING DESTINATION')");
  await page.waitForSelector(`text=${testUrl}`);
  console.log("Analyzing screen successfully received the extracted URL!");

  await page.screenshot({ path: "test_stage2_analyzing_with_url.png", fullPage: true });
  console.log("Saved test_stage2_analyzing_with_url.png");

  // Wait for it to complete or skip to Result
  await page.click("button:has-text('Skip to Result')");
  await page.waitForSelector("h3:has-text('WHY WE FLAGGED IT')");
  console.log("Result screen displayed!");

  await page.screenshot({ path: "test_stage2_result.png", fullPage: true });
  console.log("Saved test_stage2_result.png");

  await browser.close();
  console.log("=== All Stage 2 tests PASSED successfully! ===");
}

run().catch((err) => {
  console.error("Stage 2 test failed:", err);
  process.exit(1);
});
