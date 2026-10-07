import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  const circle = page.locator('button[aria-label="Credential Form Sniffer"]').first();
  await circle.hover();
  await page.waitForTimeout(500);

  await page.screenshot({ path: "test_features_section.png", fullPage: true });
  await browser.close();
  console.log("Saved test_features_section.png");
}

run().catch(console.error);
