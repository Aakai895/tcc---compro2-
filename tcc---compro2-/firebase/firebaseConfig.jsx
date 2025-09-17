import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxe-O2bdQ19Yo8N1Rqf_2eJpfUIk9LnTE",
  authDomain: "compro-d8507.firebaseapp.com",
  databaseURL: "https://compro-d8507-default-rtdb.firebaseio.com",
  projectId: "compro-d8507",
  storageBucket: "compro-d8507.firebasestorage.app",
  messagingSenderId: "378462570464",
  appId: "1:378462570464:web:75f4e635890685e234cd85"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
