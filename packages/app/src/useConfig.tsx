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

function useConfig() {
    (window as any).ethereum = ParticleProvider;

    const particle = new ParticleNetwork({
        projectId: 'c1b93722-cdab-4f50-b03e-8a997efb3a2e',
        clientKey: 'crQY6HUKI00FPi4uvsFY25pqxm0c390Huf9h1Vd2',
        appId: 'cf0044fe-d6b6-4498-bcbf-8ce9e3bb9033',
        chainName: EthereumSepolia.name,
        chainId: EthereumSepolia.id,
        wallet: {
            displayWalletEntry: false,
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
                rainbowWallet({ chains, projectId: '2b508ce9975b8f0ccd539a24438696e2' }),
                coinbaseWallet({ appName: 'RainbowKit demo', chains }),
                metaMaskWallet({ chains, projectId: '2b508ce9975b8f0ccd539a24438696e2' }),
                walletConnectWallet({ chains, projectId: '2b508ce9975b8f0ccd539a24438696e2' }),
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

