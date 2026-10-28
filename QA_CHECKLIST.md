# V7 Revision 01 QA

Tested in browser automation on static assets with a simulated browser-storage origin (without actual Firebase network credentials).

- [x] Single Test Admin gate launches into an empty workspace.
- [x] Creates a project with a selected sales owner and unique Project ID.
- [x] Enters **two curtain units at the same height** and applies four default installation offsets.
- [x] Edits only the second unit's left installation offset (first remains unchanged).
- [x] Price admin fills required fabric fields on both units and pricing updates.
- [x] Admin approves pricing, then review becomes eligible for sales confirmation.
- [x] Both sets of offsets appear on review and work order.
- [x] Confirmed job displays a **green** status in work history.
- [x] Project ID search filters items to matching identifiers.
- [x] Editing a previously confirmed measurement invalidates price approval and shows **yellow** in-progress status.
- [x] Deletes a job through typed Project ID confirmation and restores from local trash.
- [x] No JavaScript exceptions in the tested demo workflow.

Not tested or not connected:

- [ ] Actual Google Sign-In against the company's Firebase config/registered domain.
- [ ] Google Drive/Sheets file creation and permissions.
- [ ] Multi-device concurrent writes / conflicts.
- [ ] Backend login verification and owner-based deletion.
- [ ] Actual customer data workflows.
- [ ] Full pricing edge-case matrix, especially fabric joining and accessories.
