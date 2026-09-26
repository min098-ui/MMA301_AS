import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

let app: FirebaseApp;
let db: Firestore;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  db = getFirestore(app);
} catch (error) {
  console.warn('Firebase initialization warning:', error);
  // Fallback re-initialization if needed
  if (getApps().length > 0) {
    app = getApp();
    db = getFirestore(app);
  } else {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
}

export { app, db };
export default db;
