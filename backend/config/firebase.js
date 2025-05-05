import { initializeApp } from 'firebase/app';

import { getDatabase, ref, set, get,push } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA2um2ENxNZBxLuuzJwW280uV-2p3eFVN4",
  authDomain: "performanceanalyzer-cda3c.firebaseapp.com",
  databaseURL: "https://performanceanalyzer-cda3c-default-rtdb.firebaseio.com",
  projectId: "performanceanalyzer-cda3c",
  storageBucket: "performanceanalyzer-cda3c.firebasestorage.app",
  messagingSenderId: "660653763887",
  appId: "1:660653763887:web:ab1539423bcc5f82a485da",
  measurementId: "G-5RTKGSLN8B"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const getReportsRef = (url) => ref(db, `reports/${url}`);
const getTrackerRef = () => ref(db, 'tracker'); 

export { getReportsRef,getTrackerRef, db, ref, set, get, push};