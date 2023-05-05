// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC8hhumlPVpx0WHCCiuH4BDjwsLWVDYbH4',
  authDomain: 'todo-fbab6.firebaseapp.com',
  projectId: 'todo-fbab6',
  storageBucket: 'todo-fbab6.appspot.com',
  messagingSenderId: '513985988291',
  appId: '1:513985988291:web:7117c7cc9ca096f4968476',
  measurementId: 'G-E5TG8NEJXQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
