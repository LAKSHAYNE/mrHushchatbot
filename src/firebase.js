import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCxdlBcG_DbyOEoLJlBbM0KIAfLB3dQv_E",
  authDomain: "hush-chatbot.firebaseapp.com",
  projectId: "hush-chatbot",
  storageBucket: "hush-chatbot.appspot.com",
  messagingSenderId: "766524446908",
  appId: "1:766524446908:web:1f7028493aef108cdad8b9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
export default db;
