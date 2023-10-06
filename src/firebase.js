// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-app-b87a0.firebaseapp.com",
  projectId: "real-estate-app-b87a0",
  storageBucket: "real-estate-app-b87a0.appspot.com",
  messagingSenderId: "491078279978",
  appId: "1:491078279978:web:b70fc7f25f0f9c8b2cb453"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);