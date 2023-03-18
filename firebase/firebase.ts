// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrxmEqkhJ7CiETJ7FI-7LYd8q_EoOJLaA",
  authDomain: "chatgpt-clone-13e0d.firebaseapp.com",
  projectId: "chatgpt-clone-13e0d",
  storageBucket: "chatgpt-clone-13e0d.appspot.com",
  messagingSenderId: "264349089548",
  appId: "1:264349089548:web:8e4a8cea67da240e091329",
};

// Initialize Firebase
const app = !!getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
