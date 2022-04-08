import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyBTksepPOv7MO4H4Ir1dX7tOJ5WGyOhHSI",
  
    authDomain: "clone-19369.firebaseapp.com",
  
    projectId: "clone-19369",
  
    storageBucket: "clone-19369.appspot.com",
  
    messagingSenderId: "1043362453116",
  
    appId: "1:1043362453116:web:ac7ace0b17b2c043131bf9"
  
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  export { db, auth };