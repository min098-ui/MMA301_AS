/**
 * Firebase Configuration
 * Connected to project: mma30-dc71a
 */

export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCetKKlEgHLp8Wlmaq60YgsRxwJVKJjoBU',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'mma30-dc71a.firebaseapp.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'mma30-dc71a',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mma30-dc71a.firebasestorage.app',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '465012638838',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:465012638838:web:61032d4cbfa2d3825c0b57',
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-BSC7DNWSHH',
};

export const isFirebaseConfigured = (): boolean => {
  return (
    Boolean(firebaseConfig.projectId) &&
    firebaseConfig.projectId === 'mma30-dc71a'
  );
};
