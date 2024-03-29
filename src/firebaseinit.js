import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAQQ64WO2roI9giQMVVRlfmBmpMgnVA6F4",
    authDomain: "drive-clone-58b8d.firebaseapp.com",
    projectId: "drive-clone-58b8d",
    storageBucket: "drive-clone-58b8d.appspot.com",
    messagingSenderId: "345132510258",
    appId: "1:345132510258:web:585323cd81a8085f74a02b",
    measurementId: "G-NZXQG474F0"
    };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()
const db = firebaseApp.firestore()

export { auth, provider, db, storage }