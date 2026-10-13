import { chromium } from '@playwright/test';
import path from 'path';

async function captureAuditScreenshots() {
  const browser = await chromium.launch();
  const artifactDir = 'C:\\Users\\prane\\.gemini\\antigravity-ide\\brain\\1120f920-7100-43b7-bc69-7c855ee8d7ed';

  const viewports = [
    { name: 'desktop_1920x1080', width: 1920, height: 1080 },
    { name: 'laptop_1440x900', width: 1440, height: 900 },
    { name: 'mobile_390x844', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });

    console.log(`Navigating at ${vp.width}x${vp.height}...`);
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000); // allow Three.js canvas to render

    // 1. Hero Viewport Screenshot (Requested resolutions)
    const heroPath = path.join(artifactDir, `audit_homepage_${vp.width}x${vp.height}.png`);
    await page.screenshot({ path: heroPath, fullPage: false, timeout: 15000 });
    console.log(`Saved screenshot: ${heroPath}`);

    // If mobile, also scroll down slightly to verify responsive stacking
    if (vp.width === 390) {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(1000);
      const mobileMidPath = path.join(artifactDir, `audit_homepage_mobile_services_390x844.png`);
      await page.screenshot({ path: mobileMidPath, fullPage: false, timeout: 15000 });
      console.log(`Saved mobile services screenshot: ${mobileMidPath}`);
    }

    await page.close();
  }

  await browser.close();
  console.log('All audit screenshots captured successfully!');
}

captureAuditScreenshots().catch(console.error);
