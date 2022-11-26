import { useWeb3Wallet } from "@/contexts";
import { Button, Card, TextField, Typography } from "@mui/material";
import { MouseEvent } from "react";
import { Controller } from "react-hook-form";
import { ConnectedWalletInfo } from "./ConnectedWalletInfo";
import styles from "./NewTokenForm.module.scss";
import { useCreateNewToken } from "./useCreateNewToken";

export const NewTokenForm = () => {
  const { isWalletConnected, connectWallet, isSupportedChain } =
    useWeb3Wallet();

  const { control, handleSubmit } = useCreateNewToken();

  const handleConnectWallet = (e: MouseEvent) => {
    e.preventDefault();
    connectWallet(undefined);
  };

  return (
    <Card>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Typography variant="h4">Create new cryptocurrency</Typography>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="Token name"
              {...field}
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="symbol"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="Token symbol"
              {...field}
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="Amount of tokens"
              {...field}
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />
        {isWalletConnected ? (
          <>
            <ConnectedWalletInfo />
            <Button
              size="large"
              variant="contained"
              disabled={!isSupportedChain}
              type="submit"
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
