import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const persistedAuth = JSON.parse(localStorage.getItem("auth"));
  const persistedUser = JSON.parse(localStorage.getItem("user"));
  const [auth, setAuth] = useState(persistedAuth);
  const [userName, setUserName] = useState(persistedUser);

  function login(authData) {
    setAuth(authData.token);
    setUserName(authData.username)
    localStorage.setItem("auth", JSON.stringify(authData.token));
    localStorage.setItem("user", JSON.stringify(authData.username));
  }

  return (
    <AuthContext.Provider value={{ auth, userName, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;