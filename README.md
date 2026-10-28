# PROFACE Workflow Studio — V7 Revision 02

## What's new

1. **Staff picker restored.** The Netflix-style profile selector is back with S'Beam, S'Tong, S'Gun, S'Bank, two Showroom accounts (Wachida and Chanapat), and System Admin. Choose a staff profile, then use **เปลี่ยน Staff** in the project ribbon to switch. **In demo mode, profiles simulate roles, not real account authentication.**
2. **Review Cards/Table toggle.** On the **ตรวจสอบงาน** screen, choose **การ์ด** or **ตาราง**. Table columns include floor/room/spot, curtain type, product code, width, height, track/opening, top/bottom/left/right installation distances (centimeters), pricing method, photo count, pricing status, and rounded price. The table scrolls horizontally when needed. Switching only affects presentation, not data or prices. The choice is remembered in the same browser.
3. The work from Revision 01 remains: per-item four-side distances, status colors, search by project ID, soft deletion/recovery, approval and revision control, optional photos, work-order and quotation outputs, five pricing types.
4. Existing Revision 01 localStorage data is intentionally preserved if launched on the **same website origin**; changing hosting origins or opening a different file path can make browser storage appear blank. Use Export to back up critical test data.

## How to test

- Extract all website files into a single folder; open `index.html` in a modern browser.
- Staff selector → choose S'Beam or another role → create a new project → measure and record items.
- Open **ตรวจสอบงาน** and toggle the **การ์ด / ตาราง** buttons. The desktop defaults to table; smaller screens default to cards, except when the user saved a prior preference.
- Use **⇄ เปลี่ยน Staff** to return to the staff selector. The app preserves the project and may restore it on returning to the same profile.
- For price approval, switch to an admin-role profile such as System Admin or S'Gun, enter rates, and approve. Then go back to the seller's profile to confirm.

## Google authentication — pilot

`config.js` defaults to `mode: "demo"`. You can preview all staff roles without signing in. In Firebase mode, the Google pilot login must first verify `phonphotnuramrum@gmail.com`, **then** the tester can choose a staff role to simulate. The simulated staff role is not the Google-authenticated identity. Actions written in the demo audit log are labeled accordingly. Follow `AUTH_ACTIVATION.md` for setup. Real staff authorization needs server-side enforcement before production.

## Data and security

**No cloud data integration is active.** The app still uses browser localStorage, without cross-device sync or a secure backend, and it does not create anything in the central company's Google Drive or Sheets. Do not use it with sensitive/live customer data on a public deployment. The selectable profiles and role checks in the demo are UI/workflow tests, not an access-control boundary.

## Main files

- `index.html`, `app.js`, `styles.css`, `quote.css`: website.
- `config.js`: optional Firebase Sign-In configuration; no private keys belong here.
- `AUTH_ACTIVATION.md`, `GOOGLE_BACKEND_PLAN.md`, `FORMULA_RULES.md`, `QA_CHECKLIST.md`: supporting docs.
