// Public Firebase Web App metadata for PROFACE V9 cloud-connected pilot.
// NEVER add service-account keys, OAuth client secrets or refresh tokens here.
window.PROFACE_CONFIG = {
 mode: 'firebase',
 cloudRequired: true, // Block local/random project creation until Cloudflare is connected
 // The deployed V8 Worker API remains the backend for V9. Do not append /api here.
 apiBase: 'https://proface-workflow-v8-api.proface-corporation.workers.dev',
 firebase: {
  apiKey: 'AIzaSyAKYENGTFcXMAAnpVQLm-97Z_4kTTm__6I',
  authDomain: 'proface-workflow-v8.firebaseapp.com',
  projectId: 'proface-workflow-v8',
  storageBucket: 'proface-workflow-v8.firebasestorage.app',
  messagingSenderId: '1019832284089',
  appId: '1:1019832284089:web:1cc600878aaa8bb0defc68',
  measurementId: 'G-H67L50MD7F'
 }
};
// Auth: Firebase; project registry: Cloudflare D1. Google Drive/Sheets need company OAuth consent before cloud sync.
