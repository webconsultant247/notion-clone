// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrHLUdNJtGluNzE8vLJkDKKqAmf54JZGs",
  authDomain: "webconsultant247-f1b10.firebaseapp.com",
  databaseURL: "https://webconsultant247-f1b10.firebaseio.com",
  projectId: "webconsultant247-f1b10",
  storageBucket: "webconsultant247-f1b10.firebasestorage.app",
  messagingSenderId: "370615374748",
  appId: "1:370615374748:web:5cd704288d42880c7b6e59",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
