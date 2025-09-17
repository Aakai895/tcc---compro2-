import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function addUser(userData) {
  return await addDoc(collection(db, "users"), userData);
}

export async function getUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addLogin(cpfCnpj, timestamp) {
  return await addDoc(collection(db, "logins"), { cpfCnpj, timestamp });
}
