import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const functions = firebase.functions();
const storage = firebase.storage();

export {db, functions, storage}
