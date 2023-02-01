import React, { useContext } from 'react';

export function UserDataProvider({ user, children }) {
  return (
    <UserDataContext.Provider value={user}>{children}</UserDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserDataContext);
}

const UserDataContext = React.createContext(null);
