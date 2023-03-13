// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0FDSSH7LV5zfI7v-nDXpEWKn3t6GbtMA",
  authDomain: "react-cursos-e3315.firebaseapp.com",
  projectId: "react-cursos-e3315",
  storageBucket: "react-cursos-e3315.appspot.com",
  messagingSenderId: "1081243347213",
  appId: "1:1081243347213:web:3c9ed4ae06f0e2cb7b2844"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseStore = getFirestore(FirebaseApp)

