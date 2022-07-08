import { createContext, useState } from "react";

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

  // The provider allows any of it's child components to access the values inside of its useState.
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
