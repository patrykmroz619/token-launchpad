import { useWeb3Wallet } from "@/contexts";
import { Button, Card, TextField, Typography } from "@mui/material";
import { MouseEvent } from "react";
import { ConnectedWalletInfo } from "./ConnectedWalletInfo";
import styles from "./NewTokenForm.module.scss";

export const NewTokenForm = () => {
  const { isWalletConnected, connectWallet, isSupportedChain } =
    useWeb3Wallet();

  const handleConnectWallet = (e: MouseEvent) => {
    e.preventDefault();
    connectWallet(undefined);
  };

  return (
    <Card>
      <form className={styles.form}>
        <Typography variant="h4">Create new cryptocurrency</Typography>
        <TextField label="Token name" />
        <TextField label="Token symbol" />
        <TextField label="Amount of tokens" />
        {isWalletConnected ? (
          <>
            <ConnectedWalletInfo />
            <Button
              size="large"
              variant="contained"
              disabled={!isSupportedChain}
            >
              Create token
            </Button>
          </>
        ) : (
          <Button
            size="large"
            variant="contained"
            onClick={handleConnectWallet}
          >
            Connect wallet
          </Button>
        )}
      </form>
    </Card>
  );
};
