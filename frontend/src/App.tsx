import { Web3WalletProvider } from "./contexts";
import { MainPage } from "./pages";
import "./global.scss";

function App() {
  return (
    <Web3WalletProvider>
      <MainPage />
    </Web3WalletProvider>
  );
}

export default App;
