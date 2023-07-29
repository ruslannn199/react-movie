import { useState, createContext } from 'react';
import { successSession } from './types/types';
// @ts-ignore
export const Context: React.Context = createContext();

const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<undefined | successSession>(undefined);

  return (
    <Context.Provider value={[state, setState]}>
      {children}
    </Context.Provider>
  )
}

export default UserProvider;
