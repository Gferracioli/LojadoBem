import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextProps>({
  loading: false,
  setLoading: () => null,
});

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}

      {/* Código de loading já pré pronto*/}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-violet-950 rounded-full animate-spin"></div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

// Custom hook para usar o contexto de loading
export const useLoading = () => useContext(LoadingContext);
