import React, { useMemo } from 'react';
import { useState, createContext } from 'react';
import { AuthContext, successSession } from './types/types';
import { User } from 'firebase/auth';

export const Context: React.Context<AuthContext> = createContext<AuthContext>({
  user: null,
  setUser: () => {},
});

const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const authProviderValue = useMemo<AuthContext>(() => ({
    user, setUser
  }), [user]);

  return (
    <Context.Provider value={authProviderValue}>
      {children}
    </Context.Provider>
  )
}

export default UserProvider;
