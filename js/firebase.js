import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyClUceeJ-yqfxh_v4_l7ldy8JfjRypg3Ng",
  authDomain: "datn2-7cd83.firebaseapp.com",
  projectId: "datn2-7cd83",
  storageBucket: "datn2-7cd83.firebasestorage.app",
  messagingSenderId: "369880265020",
  appId: "1:369880265020:web:20734c017235938fc6ee39",
  measurementId: "G-Q3VQ2HQQVV"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);


