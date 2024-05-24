import { MainPage } from "./pages/MainPage";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import styled from "styled-components";
import { ConnectButton, useAccount, useConnectKit } from "@particle-network/connectkit";
import '@particle-network/connectkit/dist/index.css';
import { Button } from "./components/Button";

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
        {!account && <ConnectButton />}
        {
          account &&
          <Button onClick={() => { particle.disconnect() }}>
            Disconect
          </Button>
        }

      </div>
    </Nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="h-screen">
        <NavSection />
        <Routes>
          <Route path="/" element={<MainPage />} />
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
