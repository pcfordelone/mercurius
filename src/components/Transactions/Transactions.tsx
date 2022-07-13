import BackgroundImage from "../../assets/home-background.jpg";

import { TransactionsHeader } from "./TransactionsHeader";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionsToolBar } from "./TransactionsToolBar";

import { FormEvent, useState } from "react";

import {
  AddNewTransaction,
  INewTransactionFormData,
} from "./AddNewTransaction";

import {
  useListTransactionsByDateQuery,
  Transaction,
  Category,
  Person,
  useCreateTransactionMutation,
  TransactionType,
  useListCategoriesQuery,
  PaymentType,
  usePublishTransactionMutation,
  useListPaymentTypesActivesQuery,
  useListPersonsActivesQuery,
  useDeleteTransactionsMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} from "../../graphql/generated";

import { endOfMonth, parse } from "date-fns";
import { startOfMonth } from "date-fns/esm";

import { notify } from "../../utils/notify";

import { EditTransaction, IEditTransactionFormData } from "./EditTransaction";

export const Transactions: React.FC = () => {
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

  const paymentTypes = useListPaymentTypesActivesQuery();
  const persons = useListPersonsActivesQuery();
  const categories = useListCategoriesQuery();

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

  const handleSelectCategory = (id: string, unselect?: boolean) => {
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

    console.log(transaction);
    setEditTransaction(transaction);
    setIsEditFormActive(true);
  };

  const handleDismissEditCategoryForm = () => {
    setEditTransaction(undefined);
    setIsEditFormActive(false);
  };

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center bg-gray-900 h-48 mt-48 flex-1"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="max-w-6xl py-4 m-auto flex flex-col">
        <TransactionsHeader
          startDate={startDate}
          transactions={data?.transactions as Transaction[]}
        />

        <main className="mt-6 flex flex-col gap-2">
          <TransactionsToolBar
            isLoading={isLoading}
            loading={loading}
            isActive={isAddFormForm}
            startDate={startDate}
            handleNewTransactionBtn={handleAddNewTrasactionForm}
            handleChangeDatePicker={handleChangeDatePicker}
            handleDeleteTransactions={handleDeleteTransactions}
            deleteTransactionsActive={
              selectedTransactions.length !== 0 && !isLoading ? true : false
            }
          />

          {isAddFormForm && (
            <AddNewTransaction
              isLoading={isLoading}
              handleFormSubmit={submitAddTransactionForm}
              categories={categories.data?.categories as Category[]}
              persons={persons.data?.people as Person[]}
              paymentTypes={paymentTypes.data?.paymentTypes as PaymentType[]}
            />
          )}

          {isEditFormActive && (
            <EditTransaction
              isLoading={isLoading}
              handleFormSubmit={submitEditTransactionForm}
              categories={categories.data?.categories as Category[]}
              persons={persons.data?.people as Person[]}
              paymentTypes={paymentTypes.data?.paymentTypes as PaymentType[]}
              transaction={editTransaction}
              dismissForm={handleDismissEditCategoryForm}
            />
          )}

          <TransactionsTable
            transactionsData={data?.transactions as Transaction[]}
            deleteTransaction={handleDeleteTransaction}
            isLoading={isLoading}
            selectCategory={handleSelectCategory}
            editCategoryForm={handleEditCategoryForm}
          />
        </main>
      </div>
    </div>
  );
};
