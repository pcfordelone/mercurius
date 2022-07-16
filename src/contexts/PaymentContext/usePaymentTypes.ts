import { useContext } from "react";
import { PaymentTypeContext } from "./index";

export const usePaymentTypeContext = () => {
  const context = useContext(PaymentTypeContext);

  return context;
};
