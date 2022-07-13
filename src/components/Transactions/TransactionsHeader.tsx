import { format } from "date-fns";
import PtBr from "date-fns/locale/pt-BR";
import { Transaction } from "../../graphql/generated";
import { useState, useEffect } from "react";

interface ITransactionsHeaderProps {
  startDate: Date;
  transactions: Transaction[];
}

export const TransactionsHeader: React.FC<ITransactionsHeaderProps> = ({
  startDate,
  transactions,
}) => {
  const [spending, setSpending] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let transactionsTotal = 0;
    let transactionsEarnings = 0;
    let transactionSpending = 0;

    if (transactions) {
      transactions.map((transaction) => {
        if (transaction.transactionType === "credit") {
          transactionsTotal += transaction.value;
          transactionsEarnings += transaction.value;
        } else {
          transactionsTotal -= transaction.value;
          transactionSpending += transaction.value;
        }
      });
      setSpending(transactionSpending);
      setEarnings(transactionsEarnings);
      setTotal(transactionsTotal);
    }
  }, [transactions]);

  return (
    <header className="flex justify-between border-b-4 border-b-orange-400 pb-2 mt-8">
      <h1 className="flex flex-col justify-end">
        <small className="uppercase text-lg font-bold">Transações</small>
        <strong className="font-black italic text-4xl text-yellow-500">
          {format(startDate, "MMMM/yyyy", { locale: PtBr })}
        </strong>
      </h1>
      <div className="flex-1 flex justify-end gap-2">
        <div className="w-56 flex flex-col items-center bg-gray-500 py-3 px-4 rounded-xl">
          <strong className="uppercase">total débitos</strong>
          <p className="text-4xl tracking-tighter font-black text-red-400">
            <small className="font-normal text-xl">$ </small>
            {Intl.NumberFormat("pt-br", {
              style: "decimal",
            }).format(spending)}
          </p>
        </div>
        <div className="w-56 flex flex-col items-center bg-gray-500 py-3 px-4 rounded-xl">
          <strong className="uppercase">total entradas</strong>
          <p className="text-4xl tracking-tighter font-black text-green-400">
            <small className="font-normal text-xl">$ </small>
            {Intl.NumberFormat("pt-br", {
              style: "decimal",
            }).format(earnings)}
          </p>
        </div>
        <div className="w-56 flex flex-col items-center bg-gray-500 py-3 px-4 rounded-xl">
          <strong className="uppercase">total consolidado</strong>
          <p
            className={
              total > 0
                ? `text-4xl tracking-tighter font-black text-green-400`
                : `text-4xl tracking-tighter font-black text-red-400`
            }
          >
            <small className="font-normal text-xl">$ </small>
            {Intl.NumberFormat("pt-br", {
              style: "decimal",
            }).format(total)}
          </p>
        </div>
      </div>
    </header>
  );
};
