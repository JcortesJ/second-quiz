// UserContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface UserContextProps {
  children: ReactNode;
}

interface UserContextValue {
  username: string | null;
  setLoggedInUser: (user: string | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Al montar el componente, intenta recuperar el nombre de usuario desde localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const setLoggedInUser = (user: string | null) => {
    setUsername(user);

    // Almacenar el nombre de usuario en localStorage
    if (user) {
      localStorage.setItem('username', user);
    } else {
      localStorage.removeItem('username');
    }
  };

  return (
    <UserContext.Provider value={{ username, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};