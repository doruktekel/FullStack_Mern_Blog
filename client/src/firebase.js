// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e9e49.firebaseapp.com",
  projectId: "mern-blog-e9e49",
  storageBucket: "mern-blog-e9e49.appspot.com",
  messagingSenderId: "283569415961",
  appId: "1:283569415961:web:5b49d26519262098d80788",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
