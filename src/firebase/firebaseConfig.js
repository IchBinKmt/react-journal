import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDoc } from 'firebase/firestore/lite';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyWaXtHK9JEbbjIY4IGpl7a9O6spCjw7E",
  authDomain: "react-journal-34f08.firebaseapp.com",
  projectId: "react-journal-34f08",
  storageBucket: "react-journal-34f08.appspot.com",
  messagingSenderId: "588293889888",
  appId: "1:588293889888:web:1095966d7ad93f75a90805"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


// const db = firebase.firestore();
const googleAuthProvider = new GoogleAuthProvider();

// const gooogleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  auth,
  db,
  getDoc,
  addDoc, collection,
  googleAuthProvider
}