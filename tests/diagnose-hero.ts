import { chromium } from '@playwright/test';

async function diagnose() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('ERROR:', err.message));

  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000);

  const heroDetails = await page.evaluate(() => {
    const col = document.querySelector('.lg\\:col-span-7');
    return {
      hasCol: !!col,
      colHtml: col ? col.innerHTML : null,
      colChildren: col ? col.children.length : 0,
      canvasFound: !!document.querySelector('canvas')
    };
  });

  console.log('DIAGNOSE RESULT:', JSON.stringify(heroDetails, null, 2));
  await browser.close();
}

diagnose().catch(console.error);
