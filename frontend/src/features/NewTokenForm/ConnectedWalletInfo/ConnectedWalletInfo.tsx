import { CONFIG } from "@/config";
import { useWeb3Wallet } from "@/contexts";
import { Typography } from "@mui/material";

export const ConnectedWalletInfo = () => {
  const { account, chainId, isSupportedChain, balance, chainData } =
    useWeb3Wallet();

  return (
    <div>
      <Typography>
        <strong>Connected wallet:</strong> {account?.slice(0, 8)}...
      </Typography>
      {isSupportedChain ? (
        <>
          <Typography>
            <strong>Connected chain:</strong> {chainData.name}
          </Typography>
          <Typography>
            <strong>Native currency balance:</strong> {balance}{" "}
            {chainData.symbol}
          </Typography>
        </>
      ) : (
        <Typography color="error">
          You are connected to unsupported chain, please change network in your
          wallet
        </Typography>
      )}
    </div>
  );
};
