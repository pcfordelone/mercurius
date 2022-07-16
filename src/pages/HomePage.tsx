import { Header } from "../components/Header";
import { Transactions } from "../components/Transactions";
import { Footer } from "../components/Footer";
import { TransactionContextProvider } from "../contexts/TransactionContext/index";

export const HomePage = () => {
  return (
    <TransactionContextProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Transactions />
        <Footer />
      </div>
    </TransactionContextProvider>
  );
};
