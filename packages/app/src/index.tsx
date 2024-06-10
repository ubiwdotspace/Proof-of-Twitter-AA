import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ModalProvider } from '@particle-network/connect-react-ui';
import { evmWallets } from '@particle-network/connect';
import { EthereumSepolia } from "@particle-network/chains";
import { WalletEntryPosition } from '@particle-network/auth';

import('buffer').then(({ Buffer }) => {
  window.Buffer = Buffer;
});

ReactDOM.render(
  <React.StrictMode >
    <Suspense fallback={<div>Loading</div>} >
      <ModalProvider
        options={{
          //@ts-ignore
          projectId: import.meta.env.VITE_APP_PROJECT_ID as string,
          //@ts-ignore
          clientKey: import.meta.env.VITE_APP_CLIENT_KEY as string,
          //@ts-ignore
          appId: import.meta.env.VITE_APP_APP_ID as string,
          chains: [EthereumSepolia],
          wallets: [
            ...evmWallets({ projectId: '2b508ce9975b8f0ccd539a24438696e2', showQrModal: false }),
          ],

          particleWalletEntry: {    //optional: particle wallet config
            displayWalletEntry: false, //display wallet button when connect particle success.
            defaultWalletEntryPosition: WalletEntryPosition.BR,
            supportChains: [
              EthereumSepolia
            ],
            customStyle: {}, //optional: custom wallet style
          },
        }}
        theme='dark'
        cacheProvider={true}
      >
        <App />
      </ModalProvider>
    </Suspense >
  </React.StrictMode>,
  document.getElementById("root")
);
