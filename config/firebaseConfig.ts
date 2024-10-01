import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIz5yB9YlrcQhP3sYl4ImG3XBNm2eay5ufBTI",
  authDomain: "agave-3649.firebaseapp.com",
  projectId: "agave-3649",
  storageBucket: "agave-3649.appspot.com",
  messagingSenderId: "288171208344",
  appId: "1:288171208344:web:5b049769fc6b505498cd"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
