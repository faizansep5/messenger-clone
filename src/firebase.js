import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCmf-WckP_UJk0S5mzWiyxv2kZIwqIhKU0",
  authDomain: "facebook-messenger-clone-ef486.firebaseapp.com",
  projectId: "facebook-messenger-clone-ef486",
  storageBucket: "facebook-messenger-clone-ef486.appspot.com",
  messagingSenderId: "284754674058",
  appId: "1:284754674058:web:ef3fc97a74a15de42b0873",
});

const db = firebaseApp.firestore();
export default db;
