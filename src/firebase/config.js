import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTO2YIjvtfIdgGlIhGfwTAmj47oReHfko",
  authDomain: "react-music-player-8cd07.firebaseapp.com",
  projectId: "react-music-player-8cd07",
  storageBucket: "react-music-player-8cd07.appspot.com",
  messagingSenderId: "381720150230",
  appId: "1:381720150230:web:af99f6bb5a1baffcc6c977",
};

firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectStorage, projectFirestore };
