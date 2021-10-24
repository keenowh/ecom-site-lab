import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyAn3YSUyUbeAfCbyFKnWxTZYY0ptPpFAHc",
    authDomain: "e-com-db-5561a.firebaseapp.com",
    projectId: "e-com-db-5561a",
    storageBucket: "e-com-db-5561a.appspot.com",
    messagingSenderId: "103662952731",
    appId: "1:103662952731:web:6efa09375433db44dc73be",
    measurementId: "G-NGD2G984EJ",
};

const app = initializeApp(config);

export const auth = getAuth();

export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const SignInWithGoogle = () => {
    signInWithPopup(auth, provider);
};

export default app;
