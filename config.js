// PROFACE Workflow V7 Revision 02 — local preview by default.
// For real Google Sign-In: create Firebase Project, enable Google provider, authorize domain,
// paste the public *web app* Firebase configuration below; change mode to "firebase".
// Do not put private keys, OAuth client secret, or Drive refresh tokens in this file.
window.PROFACE_CONFIG = {
  mode: "demo", // "demo" | "firebase"
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    appId: "",
    messagingSenderId: ""
  }
};
