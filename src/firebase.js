
//import firebase from 'firebase/compat/app';
//import { firebase } from '@react-native-firebase/database';
//import { ref, onValue, getDatabase } from "firebase/database";
////import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'


const firebaseConfig = {
        apiKey: "AIzaSyCo5kzyTT9gFeBfmjp0BA828TLVRaJQlZc",
        authDomain: "babdar-2e214.firebaseapp.com",
        projectId: "babdar-2e214",
        databaseURL: "https://babdar-2e214-default-rtdb.firebaseio.com",
        storageBucket: "babdar-2e214.appspot.com",
        messagingSenderId: "905994725712",
        appId: "1:905994725712:web:ed32fe3f41411e016ba455",
        measurementId: "G-7WBDDKMY47"
}; 
firebase.initializeApp(firebaseConfig)

//let app;

//if (firebase.apps.length === 0) {
//  app = firebase.initializeApp(firebaseConfig)
//} else {
//  app = firebase.app();
//}

//const database = firebase.database() //getDatabase();

//console.log(database)

//console.log(app.database)

//const rtdbRef = database.ref( '/orders' ) //ref(database, '/orders' )

const db = firebase.firestore();//app.firestore();
const auth = firebase.auth();
var DATA_Ref = db.collection('meals')
const fb = firebase
var database = firebase.database();





export { db , DATA_Ref, firebase , auth, fb, database };// onValue, rtdbRef, database,  
