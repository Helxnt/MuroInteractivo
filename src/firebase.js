import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAj9CFKQcOfywWZdFABJO1KIAUMOFvidn0",
  authDomain: "murointeractivo-cbb5b.firebaseapp.com",
  projectId: "murointeractivo-cbb5b",
  storageBucket: "murointeractivo-cbb5b.appspot.com",
  messagingSenderId: "758436150874",
  appId: "1:758436150874:web:2430016483d0c34039a263"
};
const storage = firebase.initializeApp(firebaseConfig);

export {storage, firebase as default}