import firebase from "firebase/app";
import "firebase/firestore";

const environment = process.env;

const firebaseConfig = {
  apiKey: environment.REACT_APP_FIREBASE_API_KEY,
  authDomain: environment.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: environment.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: environment.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: environment.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: environment.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firestore };
