import { Grid, Typography } from "@mui/material";
import { NewTokenForm, TokensTable } from "../../features";

export const MainPage = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h3">Cryptocurrency launchpad</Typography>
      </Grid>
      <Grid item xs={12} lg={4}>
        <NewTokenForm />
      </Grid>
      <Grid item xs={12} lg={8}>
        <TokensTable />
      </Grid>
    </Grid>
  );
};
