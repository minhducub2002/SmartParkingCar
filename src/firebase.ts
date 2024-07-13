// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const database = getDatabase(app);

const analytics = getAnalytics(app);

export {database}