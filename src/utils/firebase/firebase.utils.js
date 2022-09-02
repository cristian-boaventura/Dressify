import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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
initializeApp(firebaseConfig);

////////////////////////////////////////////////////////
// Create and customize Google Auth
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Instantianting auth
export const auth = getAuth();
// Setting up popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
// Setting up redirect (just in case we want to use it)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

////////////////////////////////////////////////////////
//Instantianting firestore
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  //  We create a batch so we can add all of our objects to the collection in one successful transaction.
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // With typescript this 'if' won't be needed
  if (!userAuth) return;

  // doc creates a document object and has 3 paramaters: database, collection, document.
  const userDocRef = doc(db, "users", userAuth.uid);

  // getDoc will return an actual state of the pointed document in the database.
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    // create / set the document with the data from userAuth in my collection
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

////////////////////////////////////////////////////////

// The methods created in this file, protect the front end from changes in the service code we are using
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // With typescript this 'if' won't be needed
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
