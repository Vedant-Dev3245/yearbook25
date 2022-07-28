// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk1XasHDQT8vgNPzwRFIs9GIOWM_KNNpM",
  authDomain: "yearbook-images.firebaseapp.com",
  projectId: "yearbook-images",
  storageBucket: "yearbook-images.appspot.com",
  messagingSenderId: "397807638358",
  appId: "1:397807638358:web:db403439178ac0c0f528f7",
  measurementId: "G-VKK72PQPBP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);