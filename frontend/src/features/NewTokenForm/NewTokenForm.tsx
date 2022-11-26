import { Button, Card, Divider, TextField, Typography } from "@mui/material";
import styles from "./NewTokenForm.module.scss";

export const NewTokenForm = () => {
  return (
    <Card>
      <form className={styles.form}>
        <Typography variant="h4">Create new cryptocurrency</Typography>
        <TextField label="Token name" />
        <TextField label="Token symbol" />
        <TextField label="Amount of tokens" />
        <Button size="large" variant="contained">
          Create token
        </Button>
      </form>
    </Card>
  );
};
