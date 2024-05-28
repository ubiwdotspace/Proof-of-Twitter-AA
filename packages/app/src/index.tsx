import { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ModalProvider } from '@particle-network/connectkit'
import { evmWallets } from '@particle-network/connectors';
import { EthereumSepolia } from "@particle-network/chains";

import('buffer').then(({ Buffer }) => {
  window.Buffer = Buffer;
});

ReactDOM.render(
  <Suspense fallback={<div>Loading</div>} >
    <ModalProvider
      options={{
        //@ts-ignore
        projectId: import.meta.env.VITE_APP_PROJECT_ID as string,
        //@ts-ignore
        clientKey: import.meta.env.VITE_APP_CLIENT_KEY as string,
        //@ts-ignore
        appId: import.meta.env.VITE_APP_APP_ID as string,
        chains: [{ id: EthereumSepolia.id, name: EthereumSepolia.name }],
        connectors: [
          ...evmWallets({ projectId: '2b508ce9975b8f0ccd539a24438696e2', showQrModal: true }),
        ],
        erc4337: {
          name: 'SIMPLE',
          version: '1.0.0',
        },
        wallet: {
          topMenuType: 'close',
          customStyle: {
            supportChains: [{ id: EthereumSepolia.id, name: EthereumSepolia.name }],
          },
        },
      }}
      theme='dark'
      cacheProvider={false}
    >
      <App />
    </ModalProvider>
  </Suspense >,
  document.getElementById("root")
);
