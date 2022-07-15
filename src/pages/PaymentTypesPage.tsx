import { Header } from "../components/Header";
import { PaymentTypes } from "../components/PaymentTypes/PaymentTypes";
import { Footer } from "../components/Footer";

export const PaymentTypesPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PaymentTypes />
      <Footer />
    </div>
  );
};
