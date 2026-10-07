import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  console.log("1. Opening http://localhost:3000");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  console.log("2. Clicking 'Detonate in Sandbox' button...");
  const btn = page.locator("button:has-text('Detonate in Sandbox')").first();
  await btn.click();

  console.log("3. Waiting for Analyzing screen...");
  await page.waitForSelector("text=ANALYZING DESTINATION", { timeout: 4000 });
  console.log("✓ Analyzing screen appeared immediately!");

  console.log("4. Waiting for Result screen...");
  await page.waitForSelector("text=DANGER · HIGH RISK", { timeout: 20000 });
  console.log("✓ Result screen appeared with DANGER severity!");

  const scoreText = await page.locator("text=87").first().textContent();
  console.log(`✓ Verified score: ${scoreText} / 100`);

  await browser.close();
  console.log("🎉 Direct detonate button click verified successfully!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
