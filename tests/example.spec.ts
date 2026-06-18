import { test, expect } from '@playwright/test';

test('Deshakthi End-to-End User and Admin Journey', async ({ page }) => {
  // 1. Force desktop size to prevent mobile menus
  await page.setViewportSize({ width: 1920, height: 1080 });

  // 2. Navigate and wait for the page to settle
  await page.goto('http://127.0.0.1:5501/public/index.html');
  await page.waitForLoadState('networkidle');

  // --- INITIAL USER LOGIN ---
  await page.getByRole('link', { name: 'Register / Login', exact: false }).first().click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('weerasekarayohan@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234yohan');
  
  page.once('dialog', dialog => {
    console.log(`Login Dialog: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole('button', { name: 'Sign In', exact: false }).click();

  // --- NAVIGATION & FORM SUBMISSION ---
  await page.getByRole('link', { name: 'HOME' }).click();
  await page.getByRole('link', { name: 'EDUCATION' }).click();
  await page.getByRole('img', { name: 'Nurse in Hospital' }).click();
  await page.getByText('Construction & Engineering Primary Markets: Qatar, UAE, Singapore Civil/MEP').click();
  
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('weerasekarayohan@gmail.com');
  await page.locator('#evalDest').selectOption('Japan');
  await page.getByRole('textbox', { name: 'Tell us about your' }).fill('xxxxxxxx xxxxxxxxxx xxxxxxxxxxxxx');
  
  // Download Education PDF
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Education PDF' }).click();
  const download = await downloadPromise;
  
  // Submit Assessment
  await page.locator('#partner-form').click();
  page.once('dialog', dialog => {
    console.log(`Assessment Dialog: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole('button', { name: 'Submit for Assessment', exact: false }).click();

  // --- LOGOUT ---
  await page.getByRole('link', { name: 'Dashboard', exact: true }).click();
  page.once('dialog', dialog => {
    console.log(`Logout Dialog: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole('button', { name: 'LOGOUT' }).click();

  // --- ADMIN LOGIN ---
  await page.getByRole('link', { name: 'Register / Login', exact: false }).first().click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@deshakthi.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  
  page.once('dialog', dialog => {
    console.log(`Admin Login Dialog: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole('button', { name: 'Sign In', exact: false }).click();

  // --- ADMIN DASHBOARD ACTIONS ---
  await page.getByRole('list').getByText('📋 Assessments').click();
  // Find the first row containing your test email, and select 'Qualified' from its dropdown
await page.getByRole('row').filter({ hasText: 'weerasekarayohan@gmail.com' }).first().getByRole('combobox').selectOption('Qualified');

// Click the 'View' button inside that exact same first row
await page.getByRole('row').filter({ hasText: 'weerasekarayohan@gmail.com' }).first().getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Mark as Qualified' }).click();
  
  // --- BLOG REPORT & PROFILE UPDATE ---
  await page.getByRole('link', { name: '🌐 View Site' }).click();
  await page.getByRole('link', { name: 'BLOG' }).click();
  await page.getByText('📍 Business Bay, Dubai | 🗓️ Jan 2026 Grand Opening of Our Dubai Hub Deshakthi').click();
  
  const download1Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Blog Report (PDF)' }).click();
  const download1 = await download1Promise;
  
  await page.getByRole('link', { name: 'HOME' }).click();
  await page.getByRole('link', { name: 'Dashboard', exact: true }).click();
  
  await page.locator('#fullName').fill('yohan stephen');
  await page.getByRole('button', { name: '💾 Update Profile' }).click();
  
  // File Upload (Fixed: removed the bad .click() step)
await page.getByRole('button', { name: 'Choose File' }).setInputFiles("C:\Users\User\Downloads\education-summary-3.pdf");
  await page.getByRole('button', { name: '💾 Update Profile' }).click();
  
  const download2Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Dashboard PDF' }).click();
  const download2 = await download2Promise;
  
  await page.locator('#dashboardContainer').click();
  await page.getByRole('link', { name: 'HOME' }).click();
});