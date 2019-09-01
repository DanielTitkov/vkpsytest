import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8ol7bcLNIRcXCmloEQP5zPXZ4MPwY4pI",
    authDomain: "vkpsytest.firebaseapp.com",
    databaseURL: "https://vkpsytest.firebaseio.com",
    projectId: "vkpsytest",
    storageBucket: "",
    messagingSenderId: "243308860959",
    appId: "1:243308860959:web:5ea65536e89718b5"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()

export default firebase;

export const rrfConfig = { userProfile: 'users' } // react-redux-firebase config