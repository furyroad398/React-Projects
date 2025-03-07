import firebase from "firebase/compat/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkMqW8th7PIjTd3NZPmgcJVnn_g5e1qEQ",
  authDomain: "e-commerce-sit.firebaseapp.com",
  projectId: "e-commerce-sit",
  storageBucket: "e-commerce-sit.firebasestorage.app",
  messagingSenderId: "650707384592",
  appId: "1:650707384592:web:846de6a44a4248be0a4d95",
  measurementId: "G-YVDR71NMVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }