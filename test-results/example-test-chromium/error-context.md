# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> test
- Location: tests\example.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Register / Login' }).filter({ visible: true })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - img "Deshakthi Lanka Logo" [ref=e5]
    - generic [ref=e6]:
      - link "HOME" [ref=e7] [cursor=pointer]:
        - /url: index.html
      - link "FIND JOBS" [ref=e8] [cursor=pointer]:
        - /url: FindJobs.html
      - link "EDUCATION" [ref=e9] [cursor=pointer]:
        - /url: education.html
      - link "CONTACT" [ref=e10] [cursor=pointer]:
        - /url: ContactUs.html
      - button "LOGOUT" [active] [ref=e11] [cursor=pointer]
  - generic [ref=e13]:
    - generic [ref=e14]:
      - heading "Welcome, Yohan! 👋" [level=1] [ref=e15]
      - paragraph [ref=e16]: Track your job applications, update your profile, and manage your career journey with Deshakthi Lanka.
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "1" [level=3] [ref=e19]
        - paragraph [ref=e20]: Total Applications
      - generic [ref=e21]:
        - heading "1" [level=3] [ref=e22]
        - paragraph [ref=e23]: Active Applications
      - generic [ref=e24]:
        - heading "0" [level=3] [ref=e25]
        - paragraph [ref=e26]: Accepted Offers
    - generic [ref=e27]:
      - heading "📝 Update Your Profile" [level=2] [ref=e28]
      - generic [ref=e29]:
        - generic [ref=e30]:
          - generic [ref=e31]: Full Name *
          - textbox [ref=e32]: Yohan
        - generic [ref=e33]:
          - generic [ref=e34]: Email Address
          - textbox [disabled] [ref=e35]: weerasekarayohan@gmail.com
        - generic [ref=e36]:
          - generic [ref=e37]: Phone Number *
          - textbox [ref=e38]: "0769054210"
        - generic [ref=e39]:
          - generic [ref=e40]: Upload New CV (PDF, DOC, DOCX)
          - button "Choose File" [ref=e41]
          - generic [ref=e42]: 📄 No CV uploaded yet. Please upload your CV to apply for jobs.
        - button "💾 Update Profile" [ref=e44] [cursor=pointer]
    - generic [ref=e45]:
      - heading "📄 Download Your Dashboard Report" [level=2] [ref=e46]
      - paragraph [ref=e47]: Generate a PDF summary of your application activity and profile status. This creates a real PDF document, not a screenshot.
      - button "Download Dashboard PDF" [ref=e48] [cursor=pointer]
    - generic [ref=e49]:
      - heading "📋 My Job Applications" [level=2] [ref=e50]
      - table [ref=e52]:
        - rowgroup [ref=e53]:
          - row "Job Title Applied Date Status CV" [ref=e54]:
            - columnheader "Job Title" [ref=e55]
            - columnheader "Applied Date" [ref=e56]
            - columnheader "Status" [ref=e57]
            - columnheader "CV" [ref=e58]
        - rowgroup [ref=e59]:
          - row "lecturer 4/22/2026 Reviewing 📄 View CV" [ref=e60]:
            - cell "lecturer" [ref=e61]:
              - strong [ref=e62]: lecturer
            - cell "4/22/2026" [ref=e63]
            - cell "Reviewing" [ref=e64]:
              - generic [ref=e65]: Reviewing
            - cell "📄 View CV" [ref=e66]:
              - link "📄 View CV" [ref=e67] [cursor=pointer]:
                - /url: http://localhost:3000/public/cvs/1776852722437-472458195-SA24610760_(4).pdf
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('test', async ({ page }) => {
  4  |   await page.goto('http://127.0.0.1:5501/public/index.html');
  5  |   await page.getByRole('link', { name: 'Register / Login' }).click();
  6  |   await page.getByRole('textbox', { name: 'Email Address' }).click();
  7  |   await page.getByRole('textbox', { name: 'Email Address' }).fill('weerasekarayohan@gmail.com');
  8  |   await page.getByRole('textbox', { name: 'Password' }).click();
  9  |   await page.getByRole('textbox', { name: 'Password' }).fill('1234yohan');
  10 |   page.once('dialog', dialog => {
  11 |     console.log(`Dialog message: ${dialog.message()}`);
  12 |     dialog.dismiss().catch(() => {});
  13 |   });
  14 |   await page.getByRole('button', { name: 'Sign In →' }).click();
  15 |   await page.getByRole('link', { name: 'HOME' }).click();
  16 |   await page.getByRole('link', { name: 'EDUCATION' }).click();
  17 |   await page.getByRole('img', { name: 'Nurse in Hospital' }).click();
  18 |   await page.getByText('Construction & Engineering Primary Markets: Qatar, UAE, Singapore Civil/MEP').click();
  19 |   await page.getByRole('textbox', { name: 'Enter your email' }).click();
  20 |   await page.getByRole('textbox', { name: 'Enter your email' }).fill('weerasekarayohan@gmail.com');
  21 |   await page.locator('#evalDest').selectOption('Japan');
  22 |   await page.getByRole('textbox', { name: 'Tell us about your' }).click();
  23 |   await page.getByRole('textbox', { name: 'Tell us about your' }).fill('xxxxxxxx xxxxxxxxxx xxxxxxxxxxxxx');
  24 |   const downloadPromise = page.waitForEvent('download');
  25 |   await page.getByRole('button', { name: 'Download Education PDF' }).click();
  26 |   const download = await downloadPromise;
  27 |   await page.locator('#partner-form').click();
  28 |   page.once('dialog', dialog => {
  29 |     console.log(`Dialog message: ${dialog.message()}`);
  30 |     dialog.dismiss().catch(() => {});
  31 |   });
  32 |   await page.getByRole('button', { name: 'Submit for Assessment →' }).click();
  33 |   await page.getByRole('link', { name: 'Dashboard', exact: true }).click();
  34 |   page.once('dialog', dialog => {
  35 |     console.log(`Dialog message: ${dialog.message()}`);
  36 |     dialog.dismiss().catch(() => {});
  37 |   });
  38 |   await page.getByRole('button', { name: 'LOGOUT' }).click();
> 39 |  await page.getByRole('link', { name: 'Register / Login' }).filter({ visible: true }).click();
     |                                                                                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  40 |   await page.getByRole('textbox', { name: 'Email Address' }).click();
  41 |   await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@deshakthi.com');
  42 |   await page.getByRole('textbox', { name: 'Password' }).click();
  43 |   await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  44 |   await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  45 |   page.once('dialog', dialog => {
  46 |     console.log(`Dialog message: ${dialog.message()}`);
  47 |     dialog.dismiss().catch(() => {});
  48 |   });
  49 |   await page.getByRole('button', { name: 'Sign In →' }).click();
  50 |   await page.getByRole('list').getByText('📋 Assessments').click();
  51 |   await page.getByRole('row', { name: 'weerasekarayohan@gmail.com Japan xxxxxxxx xxxxxxxxxx xxxxxxxxxxxxx Pending View' }).getByRole('combobox').selectOption('Qualified');
  52 |   await page.getByRole('button', { name: 'View' }).first().click();
  53 |   await page.getByRole('button', { name: 'Mark as Qualified' }).click();
  54 |   await page.getByRole('link', { name: '🌐 View Site' }).click();
  55 |   await page.getByRole('link', { name: 'BLOG' }).click();
  56 |   await page.getByText('📍 Business Bay, Dubai | 🗓️ Jan 2026 Grand Opening of Our Dubai Hub Deshakthi').click();
  57 |   const download1Promise = page.waitForEvent('download');
  58 |   await page.getByRole('button', { name: 'Download Blog Report (PDF)' }).click();
  59 |   const download1 = await download1Promise;
  60 |   await page.getByRole('link', { name: 'HOME' }).click();
  61 |   await page.getByRole('link', { name: 'Dashboard', exact: true }).click();
  62 |   await page.locator('#fullName').click();
  63 |   await page.locator('#fullName').fill('yohan stephen');
  64 |   await page.getByRole('button', { name: '💾 Update Profile' }).click();
  65 |   await page.getByRole('button', { name: 'Choose File' }).click();
  66 |   await page.getByRole('button', { name: 'Choose File' }).setInputFiles('education-summary-3.pdf');
  67 |   await page.getByRole('button', { name: '💾 Update Profile' }).click();
  68 |   const download2Promise = page.waitForEvent('download');
  69 |   await page.getByRole('button', { name: 'Download Dashboard PDF' }).click();
  70 |   const download2 = await download2Promise;
  71 |   await page.locator('#dashboardContainer').click();
  72 |   await page.getByRole('link', { name: 'HOME' }).click();
  73 | });
```