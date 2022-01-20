// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzn0dCovIQLUrPVDFj5LvxMiJFbfcy45g",
  authDomain: "vertisan-22a54.firebaseapp.com",
  projectId: "vertisan-22a54",
  storageBucket: "vertisan-22a54.appspot.com",
  messagingSenderId: "138496283241",
  appId: "1:138496283241:web:6a6af431a0e26dc57848f8",
  measurementId: "G-WNJ7T79VBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;