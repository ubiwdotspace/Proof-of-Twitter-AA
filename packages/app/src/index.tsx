import ReactDOM from "react-dom";
import App from "./App";
import { WagmiConfig } from "wagmi";
import useConfig from "./useConfig";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

function AppProvider() {
  const { wagmiClient, chains } = useConfig();

  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

ReactDOM.render(<AppProvider />, document.getElementById("root"));
