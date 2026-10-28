# Activate actual Google account verification (single test user)

Target test email: **phonphotnuramrum@gmail.com**. Only this email is permitted by `app.js` in Firebase mode at present.

## Prerequisites

- An existing Google account with authorization to administer the Firebase/Google Cloud project.
- HTTPS domain such as `https://<account>.github.io` for hosting the app (local preview mode does not verify Google accounts).
- Firebase project associated with your organization's Google Cloud configuration.

## Configuration

1. Visit https://console.firebase.google.com and create/select your Firebase project.
2. Under **Authentication → Sign-in method**, enable the **Google** sign-in provider.
3. Under Authentication's **Authorized domains** settings, add the exact domain hosting this frontend (domain only, not URL path). GitHub Pages projects normally require `<username>.github.io`.
4. Register a Firebase **Web app** and copy its public web-app config (`apiKey`, `authDomain`, `projectId`, `appId`, `messagingSenderId`).
5. Open `config.js` and set `mode: "firebase"`; paste the web-app config fields. **Do not paste service account JSON, OAuth client secret, Drive refresh token, or private keys into web files.**
6. Deploy the frontend with HTTPS and verify it offers the Google Sign-In button.
7. Sign in using **phonphotnuramrum@gmail.com**; another email should be rejected by this pilot. Firebase persists the authenticated session on that device until signed out or expired/revoked.
8. In this preview, the authenticated user will access the **System Admin test profile** and can test sales-owner, pricing, and approval workflows. The browser saves project data locally until the secure backend is implemented.

## Security before staff-wide release

- Do **not** rely on JavaScript email allowlists as the only protection once shared Google Drive/Sheets APIs are added.
- API calls should send Firebase ID tokens over HTTPS. On the backend, verify ID tokens with Firebase Admin SDK and check an explicit server-side allowlist, verified provider, project ownership/role, and record version before every write.
- Use the central Google account (`proface.corporation@gmail.com`) to authorize the backend via OAuth and store the refresh token in a server-side secret store. End users must never know its credentials.
- Add a remote per-project store/registry with version checks, a photograph storage and permission model, and audit history. The per-job Google Drive/Sheets provisioner is **not included** in this demo.

## Why this was not activated by this ZIP

Google Sign-In requires Firebase project configuration, a registered authorized domain and account-owner sign-in/consent. None can be provided safely from screenshots or an email address alone. This ZIP contains the login implementation, not a completed cloud account connection.

Sources: Firebase Authentication Google provider docs (https://firebase.google.com/docs/auth/web/google-signin); Firebase Admin verifying ID tokens (https://firebase.google.com/docs/auth/admin/verify-id-tokens).
