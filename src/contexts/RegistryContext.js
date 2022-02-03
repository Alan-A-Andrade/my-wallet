import { createContext, useState } from "react";

const RegistryContext = createContext();

export function RegistryContextProvider({ children }) {
  const [registryType, setRegistryType] = useState('');

  return (
    <RegistryContext.Provider value={{ registryType, setRegistryType }}>
      {children}
    </RegistryContext.Provider>
  )
}

export default RegistryContext;