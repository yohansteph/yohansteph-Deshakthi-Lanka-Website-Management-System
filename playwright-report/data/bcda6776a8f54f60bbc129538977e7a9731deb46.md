# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> Deshakthi End-to-End User and Admin Journey
- Location: tests\example.spec.ts:3:5

# Error details

```
Error: ENOENT: no such file or directory, stat 'C:\Users\User\Desktop\My Projects\PPA Project\UsersUserDownloadseducation-summary-3.pdf'
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
      - button "LOGOUT" [ref=e11] [cursor=pointer]
  - generic [ref=e12]:
    - generic [ref=e13]: ✅ Profile updated successfully!
    - generic [ref=e14]:
      - generic [ref=e15]:
        - heading "Welcome, Administrator! 👋" [level=1] [ref=e16]
        - paragraph [ref=e17]: Track your job applications, update your profile, and manage your career journey with Deshakthi Lanka.
      - generic [ref=e18]:
        - generic [ref=e19]:
          - heading "6" [level=3] [ref=e20]
          - paragraph [ref=e21]: Total Applications
        - generic [ref=e22]:
          - heading "6" [level=3] [ref=e23]
          - paragraph [ref=e24]: Active Applications
        - generic [ref=e25]:
          - heading "0" [level=3] [ref=e26]
          - paragraph [ref=e27]: Accepted Offers
      - generic [ref=e28]:
        - heading "📝 Update Your Profile" [level=2] [ref=e29]
        - generic [ref=e30]:
          - generic [ref=e31]:
            - generic [ref=e32]: Full Name *
            - textbox [ref=e33]: yohan stephen
          - generic [ref=e34]:
            - generic [ref=e35]: Email Address
            - textbox [disabled] [ref=e36]: admin@deshakthi.com
          - generic [ref=e37]:
            - generic [ref=e38]: Phone Number *
            - textbox [ref=e39]: "1234567890"
          - generic [ref=e40]:
            - generic [ref=e41]: Upload New CV (PDF, DOC, DOCX)
            - button "Choose File" [ref=e42]
            - generic [ref=e43]: 📄 No CV uploaded yet. Please upload your CV to apply for jobs.
          - button "💾 Update Profile" [ref=e45] [cursor=pointer]
      - generic [ref=e46]:
        - heading "📄 Download Your Dashboard Report" [level=2] [ref=e47]
        - paragraph [ref=e48]: Generate a PDF summary of your application activity and profile status. This creates a real PDF document, not a screenshot.
        - button "Download Dashboard PDF" [ref=e49] [cursor=pointer]
      - generic [ref=e50]:
        - heading "📋 My Job Applications" [level=2] [ref=e51]
        - table [ref=e53]:
          - rowgroup [ref=e54]:
            - row "Job Title Applied Date Status CV" [ref=e55]:
              - columnheader "Job Title" [ref=e56]
              - columnheader "Applied Date" [ref=e57]
              - columnheader "Status" [ref=e58]
              - columnheader "CV" [ref=e59]
          - rowgroup [ref=e60]:
            - row "Neuro Sergeon 6/2/2026 Pending 📄 View CV" [ref=e61]:
              - cell "Neuro Sergeon" [ref=e62]:
                - strong [ref=e63]: Neuro Sergeon
              - cell "6/2/2026" [ref=e64]
              - cell "Pending" [ref=e65]:
                - generic [ref=e66]: Pending
              - cell "📄 View CV" [ref=e67]:
                - link "📄 View CV" [ref=e68] [cursor=pointer]:
                  - /url: http://localhost:3000/public/cvs/1780339502436-504280379-candidate-dashboard-report-1.pdf
            - row "lecturer 6/2/2026 Pending 📄 View CV" [ref=e69]:
              - cell "lecturer" [ref=e70]:
                - strong [ref=e71]: lecturer
              - cell "6/2/2026" [ref=e72]
              - cell "Pending" [ref=e73]:
                - generic [ref=e74]: Pending
              - cell "📄 View CV" [ref=e75]:
                - link "📄 View CV" [ref=e76] [cursor=pointer]:
                  - /url: http://localhost:3000/public/cvs/1780339475391-443557480-job-search-summary-2.pdf
            - row "lecturer 4/28/2026 Pending 📄 View CV" [ref=e77]:
              - cell "lecturer" [ref=e78]:
                - strong [ref=e79]: lecturer
              - cell "4/28/2026" [ref=e80]
              - cell "Pending" [ref=e81]:
                - generic [ref=e82]: Pending
              - cell "📄 View CV" [ref=e83]:
                - link "📄 View CV" [ref=e84] [cursor=pointer]:
                  - /url: http://localhost:3000/public/cvs/1777357455355-684780542-contact-us-report_(3).pdf
            - row "lecturer 4/28/2026 Reviewing 📄 View CV" [ref=e85]:
              - cell "lecturer" [ref=e86]:
                - strong [ref=e87]: lecturer
              - cell "4/28/2026" [ref=e88]
              - cell "Reviewing" [ref=e89]:
                - generic [ref=e90]: Reviewing
              - cell "📄 View CV" [ref=e91]:
                - link "📄 View CV" [ref=e92] [cursor=pointer]:
                  - /url: http://localhost:3000/public/cvs/1777357418310-2104381-contact-us-report_(2).pdf
            - row "Software Engineer 4/27/2026 Pending 📄 View CV" [ref=e93]:
              - cell "Software Engineer" [ref=e94]:
                - strong [ref=e95]: Software Engineer
              - cell "4/27/2026" [ref=e96]
              - cell "Pending" [ref=e97]:
                - generic [ref=e98]: Pending
              - cell "📄 View CV" [ref=e99]:
                - link "📄 View CV" [ref=e100] [cursor=pointer]:
                  - /url: http://localhost:3000/public/cvs/1777302973648-915498324-Deshakthi_Report_2026-04-27T02-48-05.pdf
            - row "lecturer 4/27/2026 Pending 📄 View CV" [ref=e101]:
              - cell "lecturer" [ref=e102]:
                - strong [ref=e103]: lecturer
              - cell "4/27/2026" [ref=e104]
              - cell "Pending" [ref=e105]:
                - generic [ref=e106]: Pending
              - cell "📄 View CV" [ref=e107]:
                - link "📄 View CV" [ref=e108] [cursor=pointer]:
                  - /url: http://localhost:3000/public/cvs/1777302929267-863854498-Deshakthi_Report_2026-04-27T11-38-47.pdf
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Deshakthi End-to-End User and Admin Journey', async ({ page }) => {
  4  |   // 1. Force desktop size to prevent mobile menus
  5  |   await page.setViewportSize({ width: 1920, height: 1080 });
  6  | 
  7  |   // 2. Navigate and wait for the page to settle
  8  |   await page.goto('http://127.0.0.1:5501/public/index.html');
  9  |   await page.waitForLoadState('networkidle');
  10 | 
  11 |   // --- INITIAL USER LOGIN ---
  12 |   await page.getByRole('link', { name: 'Register / Login', exact: false }).first().click();
  13 |   await page.getByRole('textbox', { name: 'Email Address' }).fill('weerasekarayohan@gmail.com');
  14 |   await page.getByRole('textbox', { name: 'Password' }).fill('1234yohan');
  15 |   
  16 |   page.once('dialog', dialog => {
  17 |     console.log(`Login Dialog: ${dialog.message()}`);
  18 |     dialog.accept().catch(() => {});
  19 |   });
  20 |   await page.getByRole('button', { name: 'Sign In', exact: false }).click();
  21 | 
  22 |   // --- NAVIGATION & FORM SUBMISSION ---
  23 |   await page.getByRole('link', { name: 'HOME' }).click();
  24 |   await page.getByRole('link', { name: 'EDUCATION' }).click();
  25 |   await page.getByRole('img', { name: 'Nurse in Hospital' }).click();
  26 |   await page.getByText('Construction & Engineering Primary Markets: Qatar, UAE, Singapore Civil/MEP').click();
  27 |   
  28 |   await page.getByRole('textbox', { name: 'Enter your email' }).fill('weerasekarayohan@gmail.com');
  29 |   await page.locator('#evalDest').selectOption('Japan');
  30 |   await page.getByRole('textbox', { name: 'Tell us about your' }).fill('xxxxxxxx xxxxxxxxxx xxxxxxxxxxxxx');
  31 |   
  32 |   // Download Education PDF
  33 |   const downloadPromise = page.waitForEvent('download');
  34 |   await page.getByRole('button', { name: 'Download Education PDF' }).click();
  35 |   const download = await downloadPromise;
  36 |   
  37 |   // Submit Assessment
  38 |   await page.locator('#partner-form').click();
  39 |   page.once('dialog', dialog => {
  40 |     console.log(`Assessment Dialog: ${dialog.message()}`);
  41 |     dialog.accept().catch(() => {});
  42 |   });
  43 |   await page.getByRole('button', { name: 'Submit for Assessment', exact: false }).click();
  44 | 
  45 |   // --- LOGOUT ---
  46 |   await page.getByRole('link', { name: 'Dashboard', exact: true }).click();
  47 |   page.once('dialog', dialog => {
  48 |     console.log(`Logout Dialog: ${dialog.message()}`);
  49 |     dialog.accept().catch(() => {});
  50 |   });
  51 |   await page.getByRole('button', { name: 'LOGOUT' }).click();
  52 | 
  53 |   // --- ADMIN LOGIN ---
  54 |   await page.getByRole('link', { name: 'Register / Login', exact: false }).first().click();
  55 |   await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@deshakthi.com');
  56 |   await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  57 |   
  58 |   page.once('dialog', dialog => {
  59 |     console.log(`Admin Login Dialog: ${dialog.message()}`);
  60 |     dialog.accept().catch(() => {});
  61 |   });
  62 |   await page.getByRole('button', { name: 'Sign In', exact: false }).click();
  63 | 
  64 |   // --- ADMIN DASHBOARD ACTIONS ---
  65 |   await page.getByRole('list').getByText('📋 Assessments').click();
  66 |   // Find the first row containing your test email, and select 'Qualified' from its dropdown
  67 | await page.getByRole('row').filter({ hasText: 'weerasekarayohan@gmail.com' }).first().getByRole('combobox').selectOption('Qualified');
  68 | 
  69 | // Click the 'View' button inside that exact same first row
  70 | await page.getByRole('row').filter({ hasText: 'weerasekarayohan@gmail.com' }).first().getByRole('button', { name: 'View' }).click();
  71 |   await page.getByRole('button', { name: 'Mark as Qualified' }).click();
  72 |   
  73 |   // --- BLOG REPORT & PROFILE UPDATE ---
  74 |   await page.getByRole('link', { name: '🌐 View Site' }).click();
  75 |   await page.getByRole('link', { name: 'BLOG' }).click();
  76 |   await page.getByText('📍 Business Bay, Dubai | 🗓️ Jan 2026 Grand Opening of Our Dubai Hub Deshakthi').click();
  77 |   
  78 |   const download1Promise = page.waitForEvent('download');
  79 |   await page.getByRole('button', { name: 'Download Blog Report (PDF)' }).click();
  80 |   const download1 = await download1Promise;
  81 |   
  82 |   await page.getByRole('link', { name: 'HOME' }).click();
  83 |   await page.getByRole('link', { name: 'Dashboard', exact: true }).click();
  84 |   
  85 |   await page.locator('#fullName').fill('yohan stephen');
  86 |   await page.getByRole('button', { name: '💾 Update Profile' }).click();
  87 |   
  88 |   // File Upload (Fixed: removed the bad .click() step)
> 89 | await page.getByRole('button', { name: 'Choose File' }).setInputFiles("C:\Users\User\Downloads\education-summary-3.pdf");
     |  ^ Error: ENOENT: no such file or directory, stat 'C:\Users\User\Desktop\My Projects\PPA Project\UsersUserDownloadseducation-summary-3.pdf'
  90 |   await page.getByRole('button', { name: '💾 Update Profile' }).click();
  91 |   
  92 |   const download2Promise = page.waitForEvent('download');
  93 |   await page.getByRole('button', { name: 'Download Dashboard PDF' }).click();
  94 |   const download2 = await download2Promise;
  95 |   
  96 |   await page.locator('#dashboardContainer').click();
  97 |   await page.getByRole('link', { name: 'HOME' }).click();
  98 | });
```