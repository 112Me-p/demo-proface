# PROFACE Workflow Studio — V7 Revision 01

## Current deliverable

A runnable **UI workflow preview** with a single test identity and an optional **Firebase Google Sign-In integration**. The web application continues V6 pricing for 5 curtain types. No customer data is preloaded.

**Important: `config.js` defaults to `mode: "demo"`.** This does **not** authenticate anyone. In demo mode, the 'System Test Administrator' button enters a single profile mapped to `phonphotnuramrum@gmail.com`, but this is a test label, not verification of the Gmail account. Do not upload live customer data on a public website in demo mode.

**Google Sign-In code is implemented but not enabled.** A real Google login requires your own Firebase configuration, an authorized website domain, and Google's account-owner approval. We have not been granted this configuration or permission, and have not connected to Google Drive or Google Sheets. There is no cloud database or multi-device sync yet.

## How to preview

1. Extract all files into the same folder.
2. Open `index.html` in a recent browser (or publish to a temporary **private testing** host).
3. Choose **เข้าสู่โหมดทดลอง**, which tests all roles from the single test profile.
4. Create a project, assign one of five sales owners, and go through the measurement → pricing → admin approval → sales confirmation → work order/quotation flow.
5. All entered data persists in browser localStorage under a new key for this Revision; it does not share your V7 test data.

## Revision features

- Four per-item installation offset fields: top/bottom/left/right, in **centimeters**; not automatically added to curtain sizing/pricing.
- Multi-width entry duplicates initial offsets, and every generated item can be edited independently.
- Offsets on measured item cards, review screen, A4 installation work order and text export.
- Project owner or full-access admin may move a project to a recoverable local trash, only after confirming the exact Project ID.
- Green **ยืนยันแล้ว** and yellow **กำลังดำเนินการ** borders in personal/admin project history.
- Search by complete or partial Project ID, including projects in the local archive.
- Revision history on measurement changes; previously approved pricing is invalidated when inputs change.
- Admin **approve-price** step is required before a sales confirmation and quotation document can be issued.
- Photos are optional and never block confirmation; the missing-photo count renders as a number rather than literal template text.
- The 5 existing pricing formula classes and manually entered prices are retained, including wide-fabric seam joining and roller/wood-blind area calculations.
- Original quotation styling and 60%/40% payment terms remain.

## Google login configuration

Read `AUTH_ACTIVATION.md`. Google Sign-In will only permit **phonphotnuramrum@gmail.com** during this pilot. This one email can test all roles and choose a sales owner during project creation. Employee account onboarding is deferred.

## What is NOT live yet

- No actual PROFACE Google Drive folders or Sheets are created.
- No cross-device synchronization or server-side concurrency protection.
- No secure server-side data access control; the local preview is not a substitute for a backend.
- No Google OAuth token or private credential is stored in the files.
- Do not use the browser preview as a production multi-user CRM.

## Files

- `index.html`, `app.js`, `styles.css`, `quote.css`: website.
- `config.js`: demo/Firebase switch and **public-only** Firebase web configuration.
- `AUTH_ACTIVATION.md`: how to enable actual sign-in.
- `QA_CHECKLIST.md`: tested flows and remaining limitations.
- `FORMULA_RULES.md`: existing V7 formula test notes (pricing conditions need validation for edge cases).
- `GOOGLE_BACKEND_PLAN.md`: prior cloud architecture plan.

This build was tested in Chromium with an in-memory browser-storage harness; actual Google Sign-In cannot be tested without access to the owner's configured Firebase project and authorized domain.
