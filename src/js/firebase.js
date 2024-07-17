import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAo6PH1qFqno0KqTKZ93-LRMqojWMGFUuU",
  authDomain: "smart-parking-management-94a98.firebaseapp.com",
  databaseURL: "https://smart-parking-management-94a98-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-parking-management-94a98",
  storageBucket: "smart-parking-management-94a98.appspot.com",
  messagingSenderId: "221595467149",
  appId: "1:221595467149:web:ae440e2e893649386d91c4",
  measurementId: "G-XDG7G87DZZ"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);