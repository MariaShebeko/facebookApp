// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzRFhSzNXgPX4FD8BndXxxtnTthQmJcHA",
  authDomain: "facebook-eec66.firebaseapp.com",
  projectId: "facebook-eec66",
  storageBucket: "facebook-eec66.appspot.com",
  messagingSenderId: "1067314234024",
  appId: "1:1067314234024:web:373bcb4b44f9e1ad69789d",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();

const storage = getStorage();

export { app, db, storage };
