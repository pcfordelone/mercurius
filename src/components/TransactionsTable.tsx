import { TransactionItem } from './TransactionItem'

export const TransactionsTable: React.FC = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-400 border-separate border-spacing-y-2">
        <thead className="text-sm uppercase bg-gray-800 text-yellow-500">
          <tr>
            <th scope="col" className="px-6 py-7 text-center">
              #
            </th>
            <th scope="col" className="px-6">
              Local
            </th>
            <th scope="col" className="px-6 text-center">
              Categoria
            </th>
            <th scope="col" className="px-6 text-center">
              Pagamento
            </th>
            <th scope="col" className="px-6 text-center">
              Familiar
            </th>
            <th scope="col" className="px-6 text-center">
              Data
            </th>
            <th scope="col" className="px-6 text-center">
              Valor
            </th>
            <th scope="col" className="px-6 py-6 text-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
        </tbody>
      </table>
    </div>
  )
}
