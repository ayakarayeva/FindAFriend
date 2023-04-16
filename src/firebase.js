import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBaFxvpBB2O8lQg4p8cw9nBCnbiPW_1ug",
  authDomain: "chatapp-dcd8e.firebaseapp.com",
  projectId: "chatapp-dcd8e",
  storageBucket: "chatapp-dcd8e.appspot.com",
  messagingSenderId: "341215718274",
  appId: "1:341215718274:web:2f3cdbd328a96a8b5d3d9b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();