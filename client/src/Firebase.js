// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdY6DADp2j9TsSTXLo3ClhgNsZoU2fF1w",
  authDomain: "sarc-yearbook2025.firebaseapp.com",
  projectId: "sarc-yearbook2025",
  storageBucket: "sarc-yearbook2025.appspot.com",
  messagingSenderId: "82672622767",
  appId: "1:82672622767:web:98502c7ff6a99390e4885a",
  measurementId: "G-8L50BRNM5L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);