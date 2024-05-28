import { MainPage } from "./pages/MainPage";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import styled from "styled-components";
import { ConnectButton, useAccount, useConnectKit, useParticleConnect } from "@particle-network/connectkit";
import '@particle-network/connectkit/dist/index.css';
import { Button } from "./components/Button";
import { Suspense } from "react";

function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const NavSection = () => {
  const account = useAccount();
  const particle = useConnectKit();

  return (
    <Nav>
      <Logo to={"https://prove.email/"}>
        ZK-Email
      </Logo>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <DocsLink href="https://prove.email/docs">Docs</DocsLink>
        {!account &&
          <div key={generateRandomString(10)}>
            <ConnectButton />
          </div>}
        {
          account &&
          <div key={generateRandomString(12)}>
            <Button onClick={() => { particle.disconnect() }}>
              Disconect
            </Button>
          </div>
        }
      </div>
    </Nav>
  );
};

const App = () => {
  return (

    <Router>
      <div className="h-screen">
        <Suspense fallback="Hello" >
          <NavSection />
        </Suspense>
        <Routes>
          <Route path="/" element={
            <Suspense fallback="Loading" >
              <MainPage />
            </Suspense>
          } />
          <Route path="*" element={<>Not found</>} />
        </Routes>
      </div>
    </Router>

  );
};

export default App;

const Logo = styled(Link)`
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px;
`;

const DocsLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  underline: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;
