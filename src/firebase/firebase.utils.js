import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import {
    getFirestore,
    getDoc,
    doc,
    setDoc,
    writeBatch,
    collection,
} from "firebase/firestore";

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
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

export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

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

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    // Create a collection reference especially if collection is non-existing
    const collectionRef = collection(firestore, collectionKey);
    // Batch functions allow multiple doc writes in a single function
    const batch = writeBatch(firestore);
    objectsToAdd.forEach((obj) => {
        // get a new doc reference IN CASE YOU WANT A NEW DOCUMENT ID or you cant set an ID immediately
        const newDocRef = doc(collectionRef);

        // add each batch to the queue for batch upload to firestore
        batch.set(newDocRef, obj);
    });

    // do the upload
    return await batch.commit();
};

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export const SignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
};

export default app;
