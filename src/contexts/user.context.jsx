import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// Store (sets Default Values)
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Component
export const UserProvider = ({ children }) => {
  // Changing Default Values
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  // The provider allows any of it's child components to access the values inside of its useState.
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
