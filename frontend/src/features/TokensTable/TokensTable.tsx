import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";

const mockData = [
  {
    name: "Name 1",
    symbol: "Symbol 1",
    address: ethers.constants.AddressZero,
    chainId: 1,
    createdAt: new Date(),
  },
  {
    name: "Name 2",
    symbol: "Symbol 2",
    address: ethers.constants.AddressZero,
    chainId: 1,
    createdAt: new Date(),
  },
  {
    name: "Name 3",
    symbol: "Symbol 3",
    address: ethers.constants.AddressZero,
    chainId: 1,
    createdAt: new Date(),
  },
  {
    name: "Name 4",
    symbol: "Symbol 4",
    address: ethers.constants.AddressZero,
    chainId: 1,
    createdAt: new Date(),
  },
  {
    name: "Name 5",
    symbol: "Symbol 5",
    address: ethers.constants.AddressZero,
    chainId: 1,
    createdAt: new Date(),
  },
];

export const TokensTable = () => {
  return (
    <Card sx={{ padding: "24px" }}>
      <Typography variant="h4">Recently created tokens</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token name</TableCell>
              <TableCell>Token symbol</TableCell>
              <TableCell>Token address</TableCell>
              <TableCell align="right">Creation date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((data) => (
              <TableRow key={data.name}>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.symbol}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell align="right">
                  {data.createdAt.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
