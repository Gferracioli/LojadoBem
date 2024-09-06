import React, { createContext, useContext, useState } from "react";

// Criar a interface que vai conter os valores das variaveis/estados/funções globais
interface LoadingProps {
  loading: boolean; // Estado de loading (true ou false)
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Criar o contexto passando os valores default que tem na minha interface
const LoadingContext = createContext<LoadingProps>({
  loading: false,
  setLoading: () => null,
});

interface LoadingProviderProps {
  children: React.ReactNode;
}

// Criar o provider que vai armazenar e fornecer o estado de loading para os componentes.
const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

// Criar o nosso hook
const useLoading = () => useContext(LoadingContext);

// a -Exportar o nosso Hook e o provider b- Lembrando que o LoadingProvider a gente precisa colocar no index.tsx global (Aonde está nossas rotas)
export { useLoading, LoadingProvider };
