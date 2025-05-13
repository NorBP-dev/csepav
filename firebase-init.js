// firebase-init.js

// Importálás csak akkor kell, ha modulként futtatod (pl. Webpack vagy Vite esetén)
// Ha sima HTML + JS projekted van, akkor az alábbi sorokat NE írd bele:

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// Firebase konfiguráció
const firebaseConfig = {
  apiKey: "AIzaSyBLLzBWxSaEQycubfUlHtIXoszxeQXl-3Y",
  authDomain: "csepav.firebaseapp.com",
  projectId: "csepav",
  storageBucket: "csepav.firebasestorage.app",
  messagingSenderId: "997488377575",
  appId: "1:997488377575:web:45d3900ccd2a2db9142c42",
  measurementId: "G-QY3VQ403BF"
};

// Firebase inicializálása
const app = firebase.initializeApp(firebaseConfig);

// Firebase Storage és Firestore referenciák
const storage = firebase.storage();
const firestore = firebase.firestore();
