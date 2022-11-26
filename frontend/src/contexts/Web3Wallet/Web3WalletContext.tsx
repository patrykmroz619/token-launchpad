import { createContext, ReactNode, useContext } from "react";

import { useWeb3WalletContextData } from "./useWeb3WalletConnect";

type Web3WalletContextData = ReturnType<typeof useWeb3WalletContextData>;

const Web3WalletContext = createContext<Web3WalletContextData | undefined>(
  undefined
);

export function useWeb3Wallet() {
  const walletContext = useContext(Web3WalletContext);

  if (!walletContext) {
    throw new Error("useWeb3Wallet hook is used outside a provider");
  }

  return walletContext;
}

type Web3WalletContextProps = {
  children: ReactNode;
};

export function Web3WalletProvider({ children }: Web3WalletContextProps) {
  const data = useWeb3WalletContextData();

  return (
    <Web3WalletContext.Provider value={data}>
      {children}
    </Web3WalletContext.Provider>
  );
}
