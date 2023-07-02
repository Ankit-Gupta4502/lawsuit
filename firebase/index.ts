
import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf3ls0YQXXCzIZPtNabTUUSF_iQSNUJ5Y",
  authDomain: "spotify-clone-c1244.firebaseapp.com",
  projectId: "spotify-clone-c1244",
  storageBucket: "spotify-clone-c1244.appspot.com",
  messagingSenderId: "71026453757",
  appId: "1:71026453757:web:5b6110aa370251f795a294",
  measurementId: "G-ZTZ724BX48"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app);



export default app;