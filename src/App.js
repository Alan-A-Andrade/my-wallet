import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { AuthProvider } from "./contexts/AuthContext";
import { RegistryContextProvider } from "./contexts/RegistryContext";
import { ReloadContextProvider } from "./contexts/ReloadContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Wallet from "./pages/Wallet";
import Registry from "./pages/Registry";

const AppStyle = styled.div`

width: 100vw;
height: 100vh;

display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

padding: 24px 24px 16px 24px;

`

function App() {
  return (
    <AuthProvider>
      <ReloadContextProvider>
        <RegistryContextProvider>
          <AppStyle>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/registry" element={<Registry />} />
                {/* <Route path="/registry/:id" element={<RegistryEdit />} /> */}
              </Routes>
            </BrowserRouter>
          </AppStyle>
        </RegistryContextProvider>
      </ReloadContextProvider>
    </AuthProvider>
  );
}

export default App;
