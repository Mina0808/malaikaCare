import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface NavContextType {
    url: string;
    setUrl: Dispatch<SetStateAction<string>>;
  }

const NavContext = createContext<NavContextType>({url: "", setUrl: () => {}});

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [url, setUrl] = useState("");

  return (
    <NavContext.Provider value={{ url, setUrl }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => useContext(NavContext);
