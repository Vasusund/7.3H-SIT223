
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAwDecm5suoPndVw4jTTx4omwoAvscjNX8",
  authDomain: "web-app-e6c83.firebaseapp.com",
  projectId: "web-app-e6c83",
  storageBucket: "web-app-e6c83.firebasestorage.app",
  messagingSenderId: "1086074510729",
  appId: "1:1086074510729:web:0b09eea05be9fe73b21558"
};
  

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);  
export const auth = getAuth(app);        
