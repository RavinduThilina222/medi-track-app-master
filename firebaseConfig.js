// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6Ygf4EVha0TaSIpuz3vab3umPbqNgI4Q",
  authDomain: "med-track-app.firebaseapp.com",
  projectId: "med-track-app",
  storageBucket: "med-track-app.firebasestorage.app",
  messagingSenderId: "712795674009",
  appId: "1:712795674009:web:1cb4f7f07773f9cea6af08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);