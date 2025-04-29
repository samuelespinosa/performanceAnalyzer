import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  // ... other config from .env
};

let app: FirebaseApp;
let db: Database;

export const initFirebase = () => {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
  }
  return { db };
};

export const getFirebaseDB = () => {
  if (!db) throw new Error('Firebase not initialized');
  return db;
};