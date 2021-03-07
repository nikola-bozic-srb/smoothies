// import firebase from 'firebase'
// import firestore from 'firebase/firestore'

import firebase from 'firebase/app';
import 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCchfzoE1S08EW30bbJ46GnnrQ98-9GXP8",
    authDomain: "make-smoothies.firebaseapp.com",
    projectId: "make-smoothies",
    storageBucket: "make-smoothies.appspot.com",
    messagingSenderId: "1069832797738",
    appId: "1:1069832797738:web:0dd08aa7131bf0b6a38d53",
    measurementId: "G-BEE74CQVDF"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);


firebaseApp.firestore().settings({ timestampsInSnapshots: true })
//export firestore database
export default firebaseApp.firestore()

