# V7 Revision 02 — QA results

Verified with headless Chromium via an in-memory HTML/CSS/JavaScript harness:

- [x] Staff selector renders seven selectable profile cards on desktop and mobile.
- [x] S'Beam creates a project and saves a measured roller blind with four installation offsets.
- [x] Review defaults to table on desktop and displays an item row with 15 columns and offsets.
- [x] Review toggles from table to cards and back without changing project data.
- [x] User selection of view is remembered via localStorage within the test origin.
- [x] After switching from S'Beam to S'Tong, S'Tong's personal project list does not expose Beam's project.
- [x] Returning to S'Beam restores the previous project.
- [x] Mobile staff picker shows all seven profiles.
- [x] No JavaScript page errors in the tested scenario.

Not tested: real Firebase OAuth (needs configured Firebase app and authorized domain), simultaneous sessions across phones, Google Drive/Sheets API writes, production access control, browser PDF print in this revision. Prior V7 Revision 01 formula validation still applies.
