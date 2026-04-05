// ✅ Firebase 10.14.1 — Sab pages ko protect karta hai (arlo-v1 project)
// 🔗 Linked Project: arlo-v1-73d70 (Firebase Console)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// 🔧 Firebase Configuration — arlo-v1 project (naya config)
const firebaseConfig = {
  apiKey: "AIzaSyA05Y2IMWbFMQkzaRYFUCBv7R9ipNgrWAU",         // API Key
  authDomain: "arlo-v1-73d70.firebaseapp.com",                // Auth Domain
  projectId: "arlo-v1-73d70",                                  // Project ID
  storageBucket: "arlo-v1-73d70.firebasestorage.app",          // Storage Bucket
  messagingSenderId: "1091613376839",                          // Messaging Sender ID
  appId: "1:1091613376839:web:188c8b7490322d2de18c62"          // App ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login check — agar logged in nahi toh index.html pe bhejo
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    // User name update karo navbar mein
    const nameEl = document.getElementById("userName");
    const avatarEl = document.getElementById("userAvatar");
    if (nameEl || avatarEl) {
      const name = user.displayName || user.email.split("@")[0];
      if (nameEl) nameEl.textContent = name;
      if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();
    }
  }
});

// ✅ Proper Firebase logout
window.logout = function () {
  signOut(auth).then(() => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    window.location.href = "index.html";
  }).catch((err) => {
    console.error("Logout error:", err);
  });
};
