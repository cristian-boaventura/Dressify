import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
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
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

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
/*
// Setting up redirect (just in case we want to use it)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
*/
////////////////////////////////////////////////////////
//Instantianting firestore
export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  //  We create a batch so we can add all of our objects to the collection in one successful transaction.
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log("error creating the user", error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

////////////////////////////////////////////////////////

// The methods created in this file, protect the front end from changes in the service code we are using
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  // With typescript this 'if' won't be needed
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsuscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsuscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
