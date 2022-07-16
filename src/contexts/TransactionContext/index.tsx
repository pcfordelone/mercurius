import { createContext, FormEvent, useState } from "react";

import {
  IEditTransactionFormData,
  INewTransactionFormData,
  ITransactionContext,
  ITransactionContextProviderProps,
} from "./interfaces";

import {
  Transaction,
  useListTransactionsByDateQuery,
  useCreateTransactionMutation,
  TransactionType,
  usePublishTransactionMutation,
  useDeleteTransactionsMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} from "../../graphql/generated";

import { endOfMonth, parse } from "date-fns";
import { startOfMonth } from "date-fns/esm";

import { notify } from "../../utils/notify";
import { scrollToTop } from "../../utils/scrollToTop";

export const TransactionContext = createContext<ITransactionContext>(
  {} as ITransactionContext
);

export const TransactionContextProvider: React.FC<
  ITransactionContextProviderProps
> = ({ children }: ITransactionContextProviderProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isAddFormForm, setAddNewTransactionForm] = useState(false);
  const [isEditFormActive, setIsEditFormActive] = useState(false);
  const [editTransaction, setEditTransaction] = useState<
    Transaction | undefined
  >();

  const [isLoading, setIsLoading] = useState(false);

  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    []
  );

  const { data, loading, error, refetch } = useListTransactionsByDateQuery({
    variables: {
      startDate: startOfMonth(startDate),
      endDate: endOfMonth(startDate),
    },
  });

  if (error)
    notify({
      message: error.message,
      type: "error",
    });

  const [createTransaction] = useCreateTransactionMutation();
  const [publishTransaction] = usePublishTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [deleteTransactions] = useDeleteTransactionsMutation();
  const [updateTransaction] = useUpdateTransactionMutation();

  const handleChangeDatePicker = (date: Date) => {
    setStartDate(date);
    setIsLoading(true);

    refetch({
      startDate: startOfMonth(date),
      endDate: endOfMonth(date),
    })
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        notify({ message: error.message, type: "error" });
      });
  };

  const handleAddNewTrasactionForm = () =>
    setAddNewTransactionForm(!isAddFormForm);

  const submitAddTransactionForm = (
    e: FormEvent<HTMLFormElement>,
    data: INewTransactionFormData
  ) => {
    e.preventDefault();
    setIsLoading(true);

    createTransaction({
      variables: {
        place: data.place,
        date: parse(`${data.date} 09:00`, "dd/MM/yyyy hh:mm", new Date()),
        value: Number(data.value.replace(",", ".")),
        transactionType: data.transactionType as TransactionType,
        category_id: data.category,
        payment_id: data.paymentType,
        person_id: data.person,
      },
    })
      .then((response) => {
        notify({ message: "Transação incluída com sucesso", type: "success" });
        const id = response.data?.createTransaction?.id;

        publishTransaction({
          variables: {
            id: id,
          },
        })
          .then(() => {
            updateCache();
            setAddNewTransactionForm(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
            notify({ message: error.message, type: "error" });
          });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        notify({ message: error.message, type: "error" });
      });
  };

  const submitEditTransactionForm = (
    e: FormEvent<HTMLFormElement>,
    data: IEditTransactionFormData
  ) => {
    e.preventDefault();
    setIsLoading(true);

    updateTransaction({
      variables: {
        id: data.id,
        place: data.place,
        date: parse(`${data.date} 09:00`, "dd/MM/yyyy hh:mm", new Date()),
        value: Number(data.value.replace(".", "").replace(",", ".")),
        transactionType: data.transactionType as TransactionType,
        category_id: data.category,
        payment_id: data.paymentType,
        person_id: data.person,
      },
    })
      .then((response) => {
        notify({ message: "Transação incluída com sucesso", type: "success" });
        const id = response.data?.updateTransaction?.id;

        publishTransaction({
          variables: {
            id: id,
          },
        })
          .then(() => {
            updateCache();
            setIsEditFormActive(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
            notify({ message: error.message, type: "error" });
          });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        notify({ message: error.message, type: "error" });
      });
  };

  const updateCache = () => {
    setAddNewTransactionForm(false);

    refetch({
      startDate: startOfMonth(startDate),
      endDate: endOfMonth(startDate),
    })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        notify({ message: error.message, type: "error" });
      });
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm("Realmente deseja apagar?")) {
      setIsLoading(true);

      deleteTransaction({
        variables: {
          id: id,
        },
      })
        .then(() => {
          notify({
            message: `Transação excluída com sucesso`,
          });
        })
        .then(updateCache)
        .catch((error) => {
          setIsLoading(true);
          console.log(error);
          notify({ message: error.message, type: "error" });
        });
    }
  };

  const handleDeleteTransactions = () => {
    if (window.confirm("Realmente deseja apagar as transações selecionadas?")) {
      setIsLoading(true);

      deleteTransactions({
        variables: {
          ids: selectedTransactions,
        },
      })
        .then(() => {
          notify({
            message: `Transações excluídas com sucesso`,
          });
          setSelectedTransactions([]);
        })
        .then(updateCache)
        .catch((error) => {
          setIsLoading(true);
          console.log(error);
          notify({ message: error.message, type: "error" });
        });
    }
  };

  const handleSelectTransaction = (id: string, unselect?: boolean) => {
    if (unselect) {
      setSelectedTransactions(
        selectedTransactions.filter((transaction) => transaction !== id)
      );
      return;
    }
    setSelectedTransactions([...selectedTransactions, id]);
  };

  const handleEditCategoryForm = async (transaction: Transaction) => {
    await handleDismissEditCategoryForm();

    setEditTransaction(transaction);
    setIsEditFormActive(true);
    scrollToTop();
  };

  const handleDismissEditCategoryForm = () => {
    setEditTransaction(undefined);
    setIsEditFormActive(false);
  };

  return (
    <TransactionContext.Provider
      value={{
        startDate,
        isAddFormForm,
        isEditFormActive,
        editTransaction,
        isLoading,
        selectedTransactions,
        data,
        loading,
        handleChangeDatePicker,
        handleAddNewTrasactionForm,
        submitAddTransactionForm,
        submitEditTransactionForm,
        updateCache,
        handleDeleteTransaction,
        handleDeleteTransactions,
        handleEditCategoryForm,
        handleDismissEditCategoryForm,
        handleSelectTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
