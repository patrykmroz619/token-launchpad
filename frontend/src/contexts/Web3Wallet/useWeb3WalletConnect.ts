/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ethers, providers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { toast } from "react-toastify";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { getBlockchainErrorMessage } from "@/utils";
import { WalletType } from "@/constants";
import { CONFIG } from "@/config";

const supportedChainsId = Object.keys(CONFIG.CHAINS);

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: Object.entries(CONFIG.CHAINS).reduce(
        (obj, curr) => ({ ...obj, [curr[0]]: curr[1].rpc }),
        {}
      ),
    },
  },
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "APP NAME",
    },
    display: {
      description: "Connect to your Coinbase Wallet",
    },
  },
};

type ConnectionType = {
  isWalletConnected: boolean;
  chainId: number | null;
  account: string | null;
  provider: ethers.providers.Web3Provider | null;
  balance: string | null;
};

const initialConnection: ConnectionType = {
  isWalletConnected: false,
  chainId: null,
  account: null,
  provider: null,
  balance: null,
};

export const useWeb3WalletContextData = () => {
  const [web3ModalInstance, setWeb3ModalInstance] = useState<Web3Modal | null>(
    null
  );
  const [connectedProvider, setConnectedProvider] = useState<any | null>(null);
  const [connection, setConnection] =
    useState<ConnectionType>(initialConnection);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async (walletType?: WalletType) => {
    try {
      switch (walletType) {
        case WalletType.METAMASK:
          setConnectedProvider(await web3ModalInstance?.connectTo("injected"));
          break;
        case WalletType.WALLET_CONNECT:
          setConnectedProvider(
            await web3ModalInstance?.connectTo("walletconnect")
          );
          break;
        case WalletType.COINBASE_WALLET:
          setConnectedProvider(
            await web3ModalInstance?.connectTo("walletlink")
          );
          break;
        case undefined:
          setConnectedProvider(await web3ModalInstance?.connect());
          break;
        default:
          throw new Error(`Unsupported wallet type: ${walletType}`);
      }
    } catch (e: unknown) {
      toast.error(getBlockchainErrorMessage(e, "Error connecting to wallet"));
    }
  };

  const disconnect = async () => {
    await web3ModalInstance?.clearCachedProvider();
    if (typeof connectedProvider?.disconnect === "function") {
      connectedProvider.disconnect();
    }

    setConnection(initialConnection);
  };

  const handleNewWeb3Provider = async (
    web3Provider: providers.Web3Provider
  ) => {
    try {
      const accounts = await web3Provider.listAccounts();
      const network = await web3Provider.getNetwork();
      const balance = await web3Provider.getBalance(accounts[0]);
      setConnection({
        isWalletConnected: true,
        provider: web3Provider,
        account: accounts[0],
        chainId: network.chainId,
        balance: formatEther(balance),
      });
    } catch (e: unknown) {
      setError("Failed to get data from your wallet.");
    }
  };

  useEffect(() => {
    const web3Modal = new Web3Modal({
      disableInjectedProvider: false,
      providerOptions,
    });

    setWeb3ModalInstance(web3Modal);
  }, []);

  useEffect(() => {
    if (connectedProvider) {
      const onAccountsChanged = (accounts: string[]) => {
        if (accounts) {
          setConnection((prevState) => ({
            ...prevState,
            account: accounts[0],
          }));
        } else {
          setConnection(initialConnection);
        }
      };

      const onChainChanged = () => {
        const web3Provider = new ethers.providers.Web3Provider(
          connectedProvider
        );
        handleNewWeb3Provider(web3Provider);
      };

      const onProviderConnection = (info: { chainId: number }) => {
        setConnection((prevState) => ({ ...prevState, chainId: info.chainId }));
      };

      const onDisconnect = () => {
        setConnection(initialConnection);
      };

      if (connectedProvider?.on) {
        connectedProvider.on("accountsChanged", onAccountsChanged);
        connectedProvider.on("chainChanged", onChainChanged);
        connectedProvider.on("connect", onProviderConnection);
        connectedProvider.on("disconnect", onDisconnect);
      }

      const web3Provider = new ethers.providers.Web3Provider(connectedProvider);
      handleNewWeb3Provider(web3Provider);

      return () => {
        if (connectedProvider?.off) {
          connectedProvider.off("accountsChanged", onAccountsChanged);
          connectedProvider.off("chainChanged", onChainChanged);
          connectedProvider.off("connect", onProviderConnection);
          connectedProvider.off("disconnect", onDisconnect);
        }

        if (connectedProvider?.removeListener) {
          connectedProvider.removeListener(
            "accountsChanged",
            onAccountsChanged
          );
          connectedProvider.removeListener("chainChanged", onChainChanged);
          connectedProvider.removeListener("connect", onProviderConnection);
          connectedProvider.removeListener("disconnect", onDisconnect);
        }
      };
    }
  }, [connectedProvider]);

  const isSupportedChain = supportedChainsId.includes(
    String(connection.chainId)
  );

  // @ts-ignore
  const chainData = CONFIG.CHAINS[
    connection.chainId || 0
  ] as typeof CONFIG.CHAINS[1];

  return {
    ...connection,
    connectWallet,
    error,
    disconnect,
    isSupportedChain,
    chainData,
  };
};
