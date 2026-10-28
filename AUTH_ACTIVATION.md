# V8 Firebase Authentication activation and QA

Firebase Project: `proface-workflow-v8`
Authorized domain: `112me-p.github.io`
Google Provider: Enabled

Test 1: natthinan.proface@gmail.com logs in -> only S'Beam tile -> Sales dashboard; no admin pricing edits.
Test 2: Logout -> phonphotnuramrum@gmail.com logs in -> only System Admin tile -> admin tools.
Test 3: other account -> automatic denial and sign-out.
Test 4: reload with active Firebase session -> user remains signed in but must choose their authorized tile again.
Test 5: logout in workspace header clears identity and returns to login gate.
Test 6: all projects/photos stay in this browser; no false Google Sheets success status.

SECURITY: No backend is attached. Frontend email allowlist cannot protect data APIs. Backend must verify Firebase ID tokens, role, ownership and record revisions on every write. Never put Google OAuth secret or Drive refresh token in a public GitHub repo. Do not upload real confidential customer information yet.
