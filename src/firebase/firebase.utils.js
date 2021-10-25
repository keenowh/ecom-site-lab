import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(firestore, "users", userAuth.uid);

    const snapShot = await getDoc(userRef);

    if (!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (err) {
            console.log("error creating user", err.message);
        }
    }

    return userRef;
};

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const SignInWithGoogle = () => {
    signInWithPopup(auth, provider);
};

export default app;
