// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxUB79-vqRVzMCfuJZhZumRyL0bVPhHQI",
  authDomain: "aymusic-e7c88.firebaseapp.com",
  projectId: "aymusic-e7c88",
  storageBucket: "aymusic-e7c88.firebasestorage.app",
  messagingSenderId: "643640497481",
  appId: "1:643640497481:web:f267fb5bf00c962ec3b698"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
