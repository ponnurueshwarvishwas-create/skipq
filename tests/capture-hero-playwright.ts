import { chromium } from '@playwright/test';
import path from 'path';

async function capture() {
  const artifactDir = 'C:\\Users\\prane\\.gemini\\antigravity-ide\\brain\\1120f920-7100-43b7-bc69-7c855ee8d7ed';
  
  const browser = await chromium.launch({
    args: ['--enable-webgl', '--ignore-gpu-blocklist', '--use-gl=swiftshader'],
  });

  const resolutions = [
    { name: '1920x1080', width: 1920, height: 1080 },
    { name: '1440x900', width: 1440, height: 900 },
    { name: '390x844', width: 390, height: 844 },
  ];

  for (const res of resolutions) {
    console.log(`Starting capture for ${res.name}...`);
    const context = await browser.newContext({
      viewport: { width: res.width, height: res.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    
    // Wait for the canvas or hero container to be visible and stable
    await page.waitForSelector('section', { state: 'visible' });
    await page.waitForTimeout(4000); // Allow WebGL shader compilation and Three.js render loop

    const heroScreenshotPath = path.join(artifactDir, `visual_audit_hero_${res.name}.png`);
    await page.screenshot({ path: heroScreenshotPath, timeout: 20000 });
    console.log(`Captured ${heroScreenshotPath}`);

    // If canvas exists, also take a direct screenshot of the canvas element
    const canvas = await page.$('canvas');
    if (canvas) {
      const canvasPath = path.join(artifactDir, `visual_audit_canvas_${res.name}.png`);
      await canvas.screenshot({ path: canvasPath, timeout: 10000 });
      console.log(`Captured canvas element: ${canvasPath}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('Capture complete!');
}

capture().catch(console.error);
