import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvMLR_9iKmlGEE4ew5opXP2zOErNJsJjQ",
  authDomain: "bella-store-ece11.firebaseapp.com",
  projectId: "bella-store-ece11",
  storageBucket: "bella-store-ece11.appspot.com",
  messagingSenderId: "619734707649",
  appId: "1:619734707649:web:b28f98c7c464e6e5a81340",
  measurementId: "G-CXP0W87RW3",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, app, storage };
