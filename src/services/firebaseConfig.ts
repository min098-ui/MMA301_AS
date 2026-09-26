/**
 * Firebase Configuration
 * Loads settings from EXPO_PUBLIC_FIREBASE_* environment variables,
 * or defaults to configured keys below.
 */

export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'AIzaSyExampleKeyNotReal1234567890',
  authDomain:
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'taskmanager-app-demo.firebaseapp.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'taskmanager-app-demo',
  storageBucket:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'taskmanager-app-demo.appspot.com',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789012',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:123456789012:web:abcdef1234567890',
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
};

export const isFirebaseConfigured = (): boolean => {
  return (
    Boolean(firebaseConfig.projectId) &&
    firebaseConfig.projectId !== 'your-project-id' &&
    firebaseConfig.apiKey !== 'AIzaSyExampleKeyNotReal1234567890'
  );
};
