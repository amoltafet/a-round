// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSWxfoP_DkzAGIsCExq2YMw3l0C1coQrc",
  authDomain: "icebreaker-a5710.firebaseapp.com",
  projectId: "icebreaker-a5710",
  storageBucket: "icebreaker-a5710.appspot.com",
  messagingSenderId: "1021741479205",
  appId: "1:1021741479205:web:1305472472b22b202096cc",
  measurementId: "G-WNZBT5JDH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };