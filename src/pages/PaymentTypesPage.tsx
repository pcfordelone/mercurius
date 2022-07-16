import { Header } from "../components/Header";
import { PaymentTypes } from "../components/PaymentTypes/PaymentTypes";
import { Footer } from "../components/Footer";
import { PaymentTypeContextProvider } from "../contexts/PaymentContext/index";

export const PaymentTypesPage: React.FC = () => {
  return (
    <PaymentTypeContextProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <PaymentTypes />
        <Footer />
      </div>
    </PaymentTypeContextProvider>
  );
};
