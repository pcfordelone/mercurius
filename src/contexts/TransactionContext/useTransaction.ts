import { useContext } from "react";
import { TransactionContext } from "./index";

export const useTransactionContext = () => {
  const transactionContext = useContext(TransactionContext);

  return transactionContext;
};
