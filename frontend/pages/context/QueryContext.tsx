// QueryContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface QueryContextProps {
  children: ReactNode;
}

interface QueryContextValue {
  queryId: string | null;
  setQueryId: (id: string | null) => void;
}

const QueryContext = createContext<QueryContextValue | undefined>(undefined);

export const QueryProvider: React.FC<QueryContextProps> = ({ children }) => {
  const [queryId, setQI] = useState<string | null>(null);

  useEffect(() => {
    // Al montar el componente, intenta recuperar la ID de la query desde localStorage
    const storedQueryId = localStorage.getItem('queryId');
    if (storedQueryId) {
        setQI(storedQueryId);
    }
  }, []);

  const setQueryId = (id: string | null) => {
    setQI(id);

    // Almacenar la ID de la query en localStorage
    if (id) {
      localStorage.setItem('queryId', id);
    } else {
      localStorage.removeItem('queryId');
    }
  };

  return (
    <QueryContext.Provider value={{ queryId, setQueryId }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = (): QueryContextValue => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error('useQuery must be used within a QueryProvider');
  }
  return context;
};
