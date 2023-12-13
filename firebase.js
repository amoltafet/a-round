import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { initializeFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from './context/store';
import { setUser, clearUser } from './context/reducers/authSlice'; 

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
let app;
let auth;

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth();
}

auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch(setUser(user));
  } else {
    store.dispatch(clearUser());
  }
});

const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };