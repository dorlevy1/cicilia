import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';

const firebaseConfig = {
    apiKey: "AIzaSyBvKq6rpRdOcZF3pzCpcd3oDHXutjOkV5Y",
    authDomain: "cicilia-e6f75.firebaseapp.com",
    projectId: "cicilia-e6f75",
    storageBucket: "cicilia-e6f75.appspot.com",
    messagingSenderId: "68302801528",
    appId: "1:68302801528:web:ba6e7d3eef6baf3806bb8d",
    measurementId: "G-M2FK8ZPZF0"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const functions = firebase.functions();
const storage = firebase.storage();

export {db, functions, storage}
