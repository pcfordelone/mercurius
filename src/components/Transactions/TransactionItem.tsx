import { format } from "date-fns";
import { PencilSimpleLine, Trash } from "phosphor-react";
import { Transaction } from "../../graphql/generated";
import { useTransactionContext } from "../../contexts/TransactionContext/useTransaction";

interface ITransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<ITransactionItemProps> = ({
  transaction,
}: ITransactionItemProps) => {
  const {
    isLoading,
    handleEditCategoryForm,
    handleSelectTransaction,
    handleDeleteTransaction,
  } = useTransactionContext();

  return (
    <tr className="border-b bg-gray-700 border-gray-700 text-gray-300">
      <td className="px-6 py-6 text-center">
        <input
          type="checkbox"
          value={transaction.id}
          onChange={(e) => {
            if (e.target.checked) {
              handleSelectTransaction(e.target.value);
              return;
            }
            handleSelectTransaction(e.target.value, true);
          }}
        />
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-bold text-gray-200 whitespace-nowrap max-w-lg"
      >
        {transaction.place}
      </th>
      <td className="px-6 py-6 text-center">{transaction.category?.name}</td>
      <td className="px-6 py-6 text-center">{transaction.paymentType?.name}</td>
      <td className="px-6 py-6 text-center">{transaction.person?.nickname}</td>
      <td className="px-6 py-6 text-center">
        {format(new Date(transaction.date), "dd/MM/yyyy")}
      </td>
      <td
        className={
          transaction.transactionType === "debit"
            ? "px-6 py-6 text-center text-red-400"
            : "px-6 py-6 text-center text-green-400"
        }
      >
        {Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format(transaction.value)}
      </td>
      <td className="px-6 py-6 text-right">
        <div className="flex gap-2 items-center justify-center">
          <button
            onClick={() => handleDeleteTransaction(transaction.id)}
            className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500 disabled:brightness-75 disabled:hover:border-gray-600"
            disabled={isLoading}
          >
            <Trash size={20} />
          </button>
          <button
            className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500 disabled:brightness-75 disabled:hover:border-gray-600"
            disabled={isLoading}
            onClick={() => handleEditCategoryForm(transaction)}
          >
            <PencilSimpleLine size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};
