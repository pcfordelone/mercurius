import BackgroundImage from "../../assets/home-background.jpg";

import { TransactionsHeader } from "./TransactionsHeader";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionsToolBar } from "./TransactionsToolBar";

import { AddNewTransaction } from "./AddNewTransaction";
import { useTransactionContext } from "../../contexts/TransactionContext/useTransaction";
import {
  useListPaymentTypesActivesQuery,
  useListPersonsActivesQuery,
  useListCategoriesQuery,
} from "../../graphql/generated";

import {
  Transaction,
  Category,
  Person,
  PaymentType,
} from "../../graphql/generated";
import { EditTransaction } from "./EditTransaction";

export const Transactions: React.FC = () => {
  const { startDate, data, isAddFormForm, isEditFormActive } =
    useTransactionContext();

  const paymentTypes = useListPaymentTypesActivesQuery();
  const persons = useListPersonsActivesQuery();
  const categories = useListCategoriesQuery();

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
          <TransactionsToolBar />

          {isAddFormForm && (
            <AddNewTransaction
              categories={categories.data?.categories as Category[]}
              persons={persons.data?.people as Person[]}
              paymentTypes={paymentTypes.data?.paymentTypes as PaymentType[]}
            />
          )}

          {isEditFormActive && (
            <EditTransaction
              categories={categories.data?.categories as Category[]}
              persons={persons.data?.people as Person[]}
              paymentTypes={paymentTypes.data?.paymentTypes as PaymentType[]}
            />
          )}

          <TransactionsTable />
        </main>
      </div>
    </div>
  );
};
