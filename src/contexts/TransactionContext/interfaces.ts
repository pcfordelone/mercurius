import { FormEvent } from "react";
import {
  Category,
  ListTransactionsByDateQuery,
  PaymentType,
  Person,
  Transaction,
} from "../../graphql/generated";

export interface INewTransactionFormData {
  place: string;
  category: string;
  paymentType: string;
  person: string;
  date: string;
  transactionType: string;
  value: string;
}

export interface IEditTransactionFormData {
  id: string;
  place: string;
  category: string;
  paymentType: string;
  person: string;
  date: string;
  transactionType: string;
  value: string;
}

export interface ITransactionContext {
  startDate: Date;
  isAddFormForm: boolean;
  isEditFormActive: boolean;
  editTransaction: Transaction | undefined;
  isLoading: boolean;
  selectedTransactions: string[];
  data: ListTransactionsByDateQuery | undefined;
  loading: boolean;
  handleChangeDatePicker: (date: Date) => void;
  handleAddNewTrasactionForm: () => void;
  submitAddTransactionForm: (
    e: FormEvent<HTMLFormElement>,
    data: INewTransactionFormData
  ) => void;
  submitEditTransactionForm: (
    e: FormEvent<HTMLFormElement>,
    data: IEditTransactionFormData
  ) => void;
  updateCache: () => void;
  handleDeleteTransaction: (id: string) => void;
  handleDeleteTransactions: () => void;
  handleSelectTransaction: (id: string, unselect?: boolean) => void;
  handleEditCategoryForm: (transaction: Transaction) => Promise<void>;
  handleDismissEditCategoryForm: () => void;
}

export interface ITransactionContextProviderProps {
  children: React.ReactNode;
}
