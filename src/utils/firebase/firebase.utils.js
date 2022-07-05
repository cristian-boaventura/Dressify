import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-8NMgB5yyvQAQjQ2wpK3rgVP5kgBNzS4",
  authDomain: "dressify-db.firebaseapp.com",
  projectId: "dressify-db",
  storageBucket: "dressify-db.appspot.com",
  messagingSenderId: "356089644292",
  appId: "1:356089644292:web:1ab4694b9984a77435bc51",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

////////////////////////////////////////////////////////
// Create and customize Google Auth
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// Instantianting auth
export const auth = getAuth();
// Setting up popup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

////////////////////////////////////////////////////////
//Instantianting firestore
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  // doc creates a document object and has 3 paramaters: database, collection, document.
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  // getDoc will return an actual state of the pointed document in the database.
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    // create / set the document with the data from userAuth in my collection
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
