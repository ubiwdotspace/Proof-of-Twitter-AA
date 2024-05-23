import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
    coinbaseWallet,
    injectedWallet,
    metaMaskWallet,
    rainbowWallet,
    walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { ParticleNetwork } from '@particle-network/auth';
import { particleWallet } from '@particle-network/rainbowkit-ext';
import '@rainbow-me/rainbowkit/styles.css';
import { useEffect, useMemo } from 'react';
import { configureChains, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { EthereumSepolia } from '@particle-network/chains';
import { ParticleProvider } from '@particle-network/provider';
import { StringChain } from 'lodash';

function useConfig() {
    (window as any).ethereum = ParticleProvider;

    const particle = new ParticleNetwork({
        // @ts-ignore
        projectId: import.meta.env.VITE_PARTICLE_PROJECT_ID as String,
        // @ts-ignore
        clientKey: import.meta.env.VITE_PARTICLE_CLIENT_KEY as String,
        // @ts-ignore
        appId: import.meta.env.VITE_PARTICLE_APP_ID as String,
        chainName: EthereumSepolia.name,
        chainId: EthereumSepolia.id,
        wallet: {
            displayWalletEntry: true,
            supportChains: [sepolia],
            customStyle: {
                evmSupportWalletConnect: true,
                supportUIModeSwitch: true,
            }
        },

        preload: true,
    });


    const { chains, publicClient, webSocketPublicClient } = configureChains(
        [sepolia],
        [
            jsonRpcProvider({
                rpc: (_) => ({
                    http: `https://rpc-sepolia.rockx.com`,
                }),
            }),
        ],
    );

    const popularWallets = useMemo(() => {
        return {
            groupName: 'Popular',
            wallets: [
                particleWallet({ chains, authType: 'google' }),
                particleWallet({ chains, authType: 'facebook' }),
                particleWallet({ chains, authType: 'apple' }),
                particleWallet({ chains, authType: 'email' }),
                particleWallet({ chains }),
                injectedWallet({ chains }),
                rainbowWallet({
                    chains,
                    // @ts-ignore
                    projectId: import.meta.env.VITE_WALLET_CONNECT_ID as String
                }),
                coinbaseWallet({ appName: 'RainbowKit demo', chains }),
                metaMaskWallet({
                    chains,
                    // @ts-ignore
                    projectId: import.meta.env.VITE_WALLET_CONNECT_ID as String
                }),
                walletConnectWallet({
                    chains,
                    // @ts-ignore 
                    projectId: import.meta.env.VITE_WALLET_CONNECT_ID as String
                }),
            ],
        };
    }, [particle]);

    const connectors = connectorsForWallets([
        popularWallets,
    ]);

    const wagmiClient = createConfig({
        autoConnect: true,
        connectors,
        publicClient,
        webSocketPublicClient,
    });

    useEffect(() => {
        particle.setERC4337({
            name: "SIMPLE",
            version: "1.0.0"
        })
    }, [])

    return { particle, wagmiClient, chains }
}

export default useConfig;

