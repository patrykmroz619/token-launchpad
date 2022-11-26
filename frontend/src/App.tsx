import { Web3WalletProvider } from "./contexts";
import { MainPage } from "./pages";
import "./global.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Web3WalletProvider>
      <MainPage />
      <ToastContainer position="top-right" />
    </Web3WalletProvider>
  );
}

export default App;
