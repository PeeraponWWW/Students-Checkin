// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGWiaUZKT3CD26dquch_Ev-NL6uxlDBKI",
  authDomain: "studentcheck-project.firebaseapp.com",
  projectId: "studentcheck-project",
  storageBucket: "studentcheck-project.appspot.com",
  messagingSenderId: "219047790581",
  appId: "1:219047790581:web:9f17052bfead04c90d02bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { auth, db };
export default app;