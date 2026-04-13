/**
 * Adobe Application Form Filler — R160621
 * Headed Chromium, STOPS before Submit.
 * Run: node fill-adobe-application.mjs
 */

import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CV_PATH = path.resolve(
  'C:\\Users\\shaha\\Documents\\1. SU Masters\\Code Space\\carrer-ops-lol\\career-ops\\output\\cv-shahaan-khan-adobe-r160621-2026-04-06.pdf'
);

const CANDIDATE = {
  firstName: 'Shahaan',
  lastName: 'Khan',
  email: 'szkhan@syr.edu',
  phone: '3152783717',
  linkedin: 'https://linkedin.com/in/shahaan-k',
  github: 'https://github.com/ShahaanK',
  portfolio: 'https://shahaank.github.io',
  city: 'Syracuse',
  state: 'New York',
  country: 'United States',
  university: 'Syracuse University',
  degree: 'M.S. Applied Human-Centered AI',
  graduation: 'December 2026',
  gpa: '', // leave blank — user to fill
  availability: 'May 2026 – August 2026',
  coverLetter: `Adobe's scale makes the LLM engineering challenges real — you're not building a demo, you're deploying to millions of marketing workflows. The combination of RAG, agentic pipelines, and multi-agent coordination in this role maps directly to what I've been building: TutorBot reduced API costs 90% through hybrid LLM architecture, and I've been designing agentic systems since my cultural bias pipeline on HPC. I want to apply that to a domain where the output has immediate product impact.`,
  howHeard: 'LinkedIn',
  relocate: 'Yes',
  workAuth: 'Yes', // authorized via CPT (F-1)
  sponsorship: 'No', // CPT is not sponsorship
  compensation: '50', // mid-range of $45-55/hr
};

const URL = 'https://adobe.wd5.myworkdayjobs.com/en-US/external_experienced/job/XMLNAME-2026-Intern---Machine-Learning-Engineer_R160621';

async function log(msg) {
  console.log(`\n[FILLER] ${msg}`);
}

async function tryFill(page, selector, value, label) {
  try {
    const el = await page.$(selector);
    if (el) {
      await el.fill(value);
      log(`  Filled "${label}": ${value}`);
      return true;
    }
  } catch (e) {
    log(`  Could not fill "${label}": ${e.message}`);
  }
  return false;
}

async function trySelect(page, selector, value, label) {
  try {
    const el = await page.$(selector);
    if (el) {
      await el.selectOption({ label: value });
      log(`  Selected "${label}": ${value}`);
      return true;
    }
  } catch (e) {
    // try by value
    try {
      await page.selectOption(selector, { value });
      log(`  Selected "${label}" by value: ${value}`);
      return true;
    } catch (e2) {
      log(`  Could not select "${label}": ${e.message}`);
    }
  }
  return false;
}

(async () => {
  log('Launching headed Chromium...');
  const browser = await chromium.launch({ headless: false, slowMo: 80 });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.setDefaultTimeout(180000);
  log(`Navigating to: ${URL}`);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  // ── STEP 1: Click "Apply" button to start the application ──────────────────
  log('Looking for Apply button...');
  const applyBtn = await page.$('button[data-automation-id="applyButton"], a[data-automation-id="applyButton"], button:has-text("Apply"), a:has-text("Apply Now")');
  if (applyBtn) {
    log('Clicking Apply button...');
    await applyBtn.click();
    await page.waitForTimeout(3000);
  } else {
    log('No Apply button found — may already be on form page.');
  }

  // ── STEP 2: Handle Workday login/create account prompt ─────────────────────
  log('Checking for sign-in prompt...');
  await page.waitForTimeout(2000);
  const snapshot1 = await page.title();
  log(`Page title: ${snapshot1}`);

  // Check for "Create Account" or "Sign In" options on Workday
  const createAcct = await page.$('a:has-text("Create Account"), button:has-text("Create Account")');
  const signIn = await page.$('a:has-text("Sign In"), button:has-text("Sign In")');

  if (createAcct || signIn) {
    log('\n========================================================');
    log('WORKDAY LOGIN REQUIRED');
    log('The form requires a Workday account (or Adobe login).');
    log('Please sign in or create an account in the browser window.');
    log('Once you are past the login screen and on the form, press ENTER here.');
    log('========================================================\n');

    // Wait until the login/create-account buttons disappear (user completed login)
    log('Waiting for you to complete login in the browser window (up to 3 minutes)...');
    await page.waitForFunction(
      () => !document.querySelector('a, button') ||
            ![...document.querySelectorAll('a, button')].some(el =>
              el.textContent.match(/sign in|create account/i)
            ),
      { timeout: 180000 }
    );
    log('Login detected as complete. Continuing...');
    await page.waitForTimeout(2000);
  }

  // ── STEP 3: Take a snapshot and analyze form structure ─────────────────────
  log('Analyzing form structure...');

  // Workday uses data-automation-id attributes heavily
  const allInputs = await page.$$eval('input[data-automation-id], select[data-automation-id], textarea[data-automation-id]',
    els => els.map(el => ({
      tag: el.tagName,
      id: el.getAttribute('data-automation-id'),
      type: el.type,
      placeholder: el.placeholder,
      value: el.value
    }))
  );
  log(`Found ${allInputs.length} form fields:`);
  allInputs.forEach(f => log(`  [${f.tag}] id="${f.id}" type="${f.type}" placeholder="${f.placeholder}"`));

  // ── STEP 4: Resume/CV Upload ────────────────────────────────────────────────
  log('\n=== SECTION: Resume Upload ===');

  // Look for file input
  const fileInput = await page.$('input[type="file"]');
  if (fileInput) {
    log(`Uploading CV from: ${CV_PATH}`);
    await fileInput.setInputFiles(CV_PATH);
    log('CV uploaded.');
    await page.waitForTimeout(2000);
  } else {
    // Workday sometimes hides the file input — click the upload button first
    const uploadBtn = await page.$('button[data-automation-id*="upload"], button:has-text("Upload"), button:has-text("Select File"), div[data-automation-id*="upload"]');
    if (uploadBtn) {
      // Set up file chooser
      const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        uploadBtn.click(),
      ]);
      await fileChooser.setFiles(CV_PATH);
      log('CV uploaded via file chooser.');
      await page.waitForTimeout(3000);
    } else {
      log('WARNING: No file input found. CV upload may need manual intervention.');
    }
  }

  // ── STEP 5: Personal Information ───────────────────────────────────────────
  log('\n=== SECTION: Personal Information ===');

  // Workday field automation IDs
  const fieldMap = [
    ['[data-automation-id="legalNameSection_firstName"]', CANDIDATE.firstName, 'First Name'],
    ['[data-automation-id="legalNameSection_lastName"]', CANDIDATE.lastName, 'Last Name'],
    ['[data-automation-id="email"]', CANDIDATE.email, 'Email'],
    ['[data-automation-id="phone-device-type"] input, input[data-automation-id*="phone"]', CANDIDATE.phone, 'Phone'],
    ['[data-automation-id="addressSection_city"]', CANDIDATE.city, 'City'],
    ['input[data-automation-id*="linkedin"], input[placeholder*="LinkedIn"]', CANDIDATE.linkedin, 'LinkedIn'],
    ['input[data-automation-id*="website"], input[placeholder*="website"], input[placeholder*="Website"]', CANDIDATE.portfolio, 'Website/Portfolio'],
  ];

  for (const [selector, value, label] of fieldMap) {
    if (value) await tryFill(page, selector, value, label);
  }

  // State dropdown
  await trySelect(page, '[data-automation-id="addressSection_countryRegion"]', 'New York', 'State');
  await trySelect(page, '[data-automation-id="addressSection_country"]', 'United States of America', 'Country');

  // ── STEP 6: Work Authorization ──────────────────────────────────────────────
  log('\n=== SECTION: Work Authorization ===');
  log('  Work authorized in US: Yes (F-1 CPT)');
  log('  Requires sponsorship: No (CPT is university-administered, not employer sponsorship)');

  // These are usually radio buttons or dropdowns — handle generically
  const authRadioYes = await page.$('input[type="radio"][value*="yes" i], input[type="radio"][value*="Yes"], label:has-text("Yes") input[type="radio"]');
  if (authRadioYes) {
    await authRadioYes.click();
    log('  Selected Yes for work authorization.');
  }

  // ── STEP 7: Cover Letter / Additional Questions ─────────────────────────────
  log('\n=== SECTION: Cover Letter / Additional Info ===');

  const coverTextarea = await page.$('textarea[data-automation-id*="coverLetter"], textarea[placeholder*="cover"], textarea[data-automation-id="coverLetterText"]');
  if (coverTextarea) {
    await coverTextarea.fill(CANDIDATE.coverLetter);
    log(`  Filled Cover Letter (${CANDIDATE.coverLetter.length} chars)`);
  }

  // How did you hear
  const hearSelect = await page.$('[data-automation-id*="sourceType"], [data-automation-id*="referral"], select[data-automation-id*="source"]');
  if (hearSelect) {
    await trySelect(page, '[data-automation-id*="sourceType"]', 'LinkedIn', 'How did you hear about us');
  }

  // ── STEP 8: Voluntary EEO / Self-Identification ─────────────────────────────
  log('\n=== SECTION: EEO / Voluntary Self-Identification ===');
  log('  *** These fields are VOLUNTARY. Surfacing to user for their decision. ***');
  log('  Fields may include: Gender, Race/Ethnicity, Veteran Status, Disability Status');
  log('  USER ACTION REQUIRED: Please review and fill these in the browser window as you see fit.');

  // ── STEP 9: Scroll through and check for missed fields ─────────────────────
  log('\n=== Checking for additional/missed fields ===');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));

  // Take a final inventory of unfilled required fields
  const requiredEmpty = await page.$$eval(
    'input[required]:not([value]), input[aria-required="true"]:not([value])',
    els => els.map(el => ({
      id: el.id,
      name: el.name,
      placeholder: el.placeholder,
      automationId: el.getAttribute('data-automation-id')
    }))
  );

  if (requiredEmpty.length > 0) {
    log('WARNING: The following required fields appear to be empty:');
    requiredEmpty.forEach(f => log(`  - ${f.automationId || f.name || f.id || f.placeholder || 'unknown'}`));
  } else {
    log('No obviously empty required fields detected.');
  }

  // ── FINAL STOP ──────────────────────────────────────────────────────────────
  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║                    ⚠  HARD STOP  ⚠                          ║');
  console.log('║                                                              ║');
  console.log('║  All fields have been filled. The browser window is open.   ║');
  console.log('║  Please review every field carefully before submitting.     ║');
  console.log('║                                                              ║');
  console.log('║  Fields requiring YOUR input:                               ║');
  console.log('║    - GPA (do not guess)                                     ║');
  console.log('║    - EEO / voluntary demographic fields                     ║');
  console.log('║    - Any references if requested                            ║');
  console.log('║    - Work authorization dropdowns (verify CPT selection)    ║');
  console.log('║                                                              ║');
  console.log('║  DO NOT SUBMIT until you have reviewed everything.          ║');
  console.log('║  Close this terminal or press Ctrl+C to quit without        ║');
  console.log('║  submitting. The browser window will remain open.           ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('\n[The script has finished filling. The browser stays open for your review.]');

  // Keep browser open — do NOT close it
  // await browser.close(); // intentionally commented out

})().catch(err => {
  console.error('\n[FILLER ERROR]', err.message);
  console.error('The browser window may still be open — check your taskbar.');
  process.exit(1);
});
