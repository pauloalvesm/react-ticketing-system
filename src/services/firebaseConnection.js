import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "your-key",
  authDomain: "tickets-2c262.firebaseapp.com",
  projectId: "tickets-2c262",
  storageBucket: "tickets-2c262.firebasestorage.app",
  messagingSenderId: "452474076456",
  appId: "1:452474076456:web:5e0004a85e8bd5a82fa41d",
  measurementId: "G-DSHKTYVGPX"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };