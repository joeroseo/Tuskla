/* eslint-disable */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/* Replace with actual Firebase Config Data */
const firebaseConfig = {
  apiKey: "XXXXXXXXXXX",
  authDomain: "XXXXXXXXXXX",
  projectId: "XXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXX",
  appId: "XXXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Authentication
export const db = getFirestore(app);
export const auth = getAuth(app);
