import { PencilSimpleLine, Trash } from 'phosphor-react'

export const TransactionItem: React.FC = () => {
  return (
    <tr className="border-b bg-gray-700 border-gray-700 text-gray-300">
      <td className="px-6 py-6 text-center">
        <input type="checkbox" />
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-bold text-gray-200 whitespace-nowrap max-w-lg"
      >
        Supermercado Extra
      </th>
      <td className="px-6 py-6 text-center">Mercado</td>
      <td className="px-6 py-6 text-center">Cartão de Crédito</td>
      <td className="px-6 py-6 text-center">Gabi</td>
      <td className="px-6 py-6 text-center">17/07/2022</td>
      <td className="px-6 py-6 text-center">R$ 130,00</td>
      <td className="px-6 py-6 text-right">
        <div className="flex gap-2 items-center justify-center">
          <button className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500">
            <Trash size={20} />
          </button>
          <button className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500">
            <PencilSimpleLine size={20} />
          </button>
        </div>
      </td>
    </tr>
  )
}
