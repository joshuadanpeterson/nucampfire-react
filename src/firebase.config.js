// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCLatU_0G2vzNNNivnztGEtt4i_ng7iSgk",
	authDomain: "nucampfire-406803.firebaseapp.com",
	projectId: "nucampfire-406803",
	storageBucket: "nucampfire-406803.appspot.com",
	messagingSenderId: "320541970423",
	appId: "1:320541970423:web:3589e3ef3277ecd967e8f2",
	measurementId: "G-MR2FYJEJ8L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Connect to the Firebase database
export const db = getFirestore(app);
