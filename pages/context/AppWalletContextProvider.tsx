import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider as ReactUIWalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
    // LedgerWalletAdapter,
    // SlopeWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { FC, ReactNode, useCallback, useMemo } from "react";
import { AutoConnectProvider, useAutoConnect } from "./AutoConnectProvider";
import { SOLANA_ENDPOINT } from "../config/config";

const WalletContextProvider = ({ children }: { children: ReactNode }) => {
    const { autoConnect } = useAutoConnect();
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => SOLANA_ENDPOINT, [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
        ],
        [network]
    );

    const onError = useCallback((error: WalletError) => {
        console.error(error);
    }, []);

    return (
        // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider
                wallets={wallets}
                onError={onError}
                autoConnect={autoConnect}
            >
                <ReactUIWalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    {children}</ReactUIWalletModalProvider>

            </WalletProvider>
        </ConnectionProvider>
    );
};

export const AppWalletContextProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AutoConnectProvider>
            <WalletContextProvider>{children}</WalletContextProvider>
        </AutoConnectProvider>
    );
};