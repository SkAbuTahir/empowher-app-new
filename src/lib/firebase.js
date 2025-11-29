import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAKM0Xj3c7sudcZCm8k9iEOddODQORl4IA",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "empowher-app.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "empowher-app",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "empowher-app.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "29084952322",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:29084952322:web:21c3e8f4a9b3d15e74c41b"
};

// Initialize Firebase (Singleton pattern for Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const appId = process.env.NEXT_PUBLIC_APP_ID || "empowher-app";

export { db, auth, appId };