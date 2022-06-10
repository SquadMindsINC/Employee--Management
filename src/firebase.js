import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDe7tQwIh9Y8SqEbLLdwmk8sBJDGGrsOhs",
  authDomain: "user-964be.firebaseapp.com",
  databaseURL: "https://user-964be-default-rtdb.firebaseio.com",
  projectId: "user-964be",
  storageBucket: "user-964be.appspot.com",
  messagingSenderId: "484398959119",
  appId: "1:484398959119:web:43eaf21d047548f2a4b17a",
  measurementId: "G-YK7ZE4BDRG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const firebaseDb = getDatabase(app);
const registerWithEmailAndPassword = async (name, email, password, navigate) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password).then(async (e) => {
      localStorage.setItem('isAuth', 'true')
      localStorage.setItem('user', JSON.stringify(e?.user))
      const user = e?.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        onlineState: "",
        role: "admin"
      });
      navigate('/dashboard')
    }).catch(err => alert(err.message))
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email, navigate) => {
  try {
    await sendPasswordResetEmail(auth, email).then(e => {
      alert("Password reset link sent!");
      navigate('/')
    }).catch(err => console.log("rest error", err))

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = async (history) => {
  const currentRole = await localStorage.getItem("role");
  localStorage.clear();
  await signOut(auth).then(e => {
    // history.push(`/user`);
  }).catch(err => console.log("signout error", err))
};
export {
  auth,
  db,
  firebaseDb,
  // logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};