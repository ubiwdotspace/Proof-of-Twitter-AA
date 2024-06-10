import { MainPage } from "./pages/MainPage";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import styled from "styled-components";
import '@particle-network/connectkit/dist/index.css';
import { Button } from "./components/Button";
import { Suspense, useState } from "react";
import { ConnectButton, useConnectKit, useAccount } from '@particle-network/connect-react-ui';

function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


const NavSection = ({ balanceState }: { balanceState: any }) => {
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
          <Flex key={generateRandomString(12)}>
            <Price>{balanceState[0] + ' ETH'} </Price>
            <Button onClick={() => { particle.disconnect() }}>
              Disconect
            </Button>
          </Flex>
        }
      </div>
    </Nav>
  );
};

const App = () => {
  const balanceState = useState(0)
  return (
    <Router>
      <div className="h-screen">
        <Suspense fallback="Hello" >
          <NavSection balanceState={balanceState} />
        </Suspense>
        <Routes>
          <Route path="/" element={
            <Suspense fallback="Loading" >
              <MainPage setBalance={balanceState[1]} />
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

const Flex = styled.div`
  width : 100%;
  display: flex;
  gap : 12px;
`
export const Price = styled.span`
  flex-wrap : nowrap;
  padding: 0 18px;
  border-radius: 4px;
  background: rgba(255,255,255,0.2);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: -0.02em;
  color: #fff;
  cursor: pointer;
  height: 48px;
  width: 100%;
  min-width: 92px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: rgba(255,255,255,0.5);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;