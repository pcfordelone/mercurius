import { Header } from "../components/Header";
import { PaymentTypes } from "../components/PaymentTypes";

export const PaymentTypesPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PaymentTypes />
    </div>
  );
};
