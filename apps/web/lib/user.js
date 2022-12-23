import React, { useContext } from 'react';
const UserDataContext = React.createContext(null);

export const UserDataProvider = ({ user, children }) => (
  <UserDataContext.Provider value={user}>{children}</UserDataContext.Provider>
);

export const useUserData = () => useContext(UserDataContext);
