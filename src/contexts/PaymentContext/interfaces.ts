import { FormEvent } from "react";

import {
  PaymentType,
  ListPaymentTypesActivesQuery,
} from "../../graphql/generated";

export interface IPaymentTypeContext {
  isEditFormActive: boolean;
  isLoading: boolean;
  editPaymentType: PaymentType | undefined;
  loading: boolean;
  isAddFormActive: boolean;
  paymentTypesSelected: string[];
  data: ListPaymentTypesActivesQuery | undefined;
  handleDismissEditForm: (id: string, unselect?: boolean) => void;
  handleSelectPaymentType: (id: string, unselect?: boolean) => void;
  handleDeletePaymentType: (id: string) => void;
  handleDeletePaymentTypes: () => void;
  handleAddFormSubmit: (e: FormEvent<HTMLFormElement>, name: string) => void;
  handleEditFormSubmit: (
    e: FormEvent<HTMLFormElement>,
    id: string,
    name: string,
    isActive: boolean
  ) => void;
  handleToggleForm: () => void;
  handleEditPaymentType: (paymentType: PaymentType) => Promise<void>;
}

export interface IPaymentTypeContextProviderProps {
  children: React.ReactNode;
}
