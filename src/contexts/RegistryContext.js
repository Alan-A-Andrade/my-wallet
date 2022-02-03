import { createContext, useState } from "react";

const RegistryContext = createContext();

export function RegistryContextProvider({ children }) {
  const [registryType, setRegistryType] = useState('');
  const [registryInfo, setRegistryInfo] = useState({ value: "", description: "" });

  return (
    <RegistryContext.Provider value={{ registryType, setRegistryType, registryInfo, setRegistryInfo }}>
      {children}
    </RegistryContext.Provider>
  )
}

export default RegistryContext;