import { PlusCircle } from 'phosphor-react'

import InputMask from 'react-input-mask'

export const AddNewTransaction: React.FC = () => {
  return (
    <form className="flex gap-2 text-sm mb-4">
      <input
        type="text"
        placeholder="Local"
        className="flex-1 bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600"
      />
      <select
        required
        className="bg-gray-200 border-0 text-gray-800 rounded-lg px-4"
      >
        <option disabled selected hidden value="">
          Categoria
        </option>
        <option value="credit">Mercado</option>
        <option value="debit">Salário</option>
        <option value="transfer">Saúde</option>
      </select>
      <select
        required
        className="bg-gray-200 border-0 text-gray-800 rounded-lg px-4"
      >
        <option disabled selected hidden value="">
          Tipo de Pagamento
        </option>
        <option value="credit">Cartão de Crédito</option>
        <option value="debit">Cartão de Débito</option>
        <option value="transfer">Transferência</option>
        <option value="pix">PIX</option>
      </select>
      <select
        required
        className="bg-gray-200 border-0 text-gray-800 rounded-lg px-4 placeholder:text-gray-600"
      >
        <option value="">Familiar</option>
        <option value="credit">Gabi</option>
        <option value="debit">PC</option>
      </select>
      <InputMask
        mask="99/99/9999"
        type="text"
        placeholder="Data"
        className="bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600"
      />
      <input
        type="text"
        placeholder="Valor"
        className="bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600"
      />
      <button className="flex flex-col items-center bg-green-500 p-2 rounded-lg transition-colors duration-300 hover:bg-green-700">
        <PlusCircle size={24} />
        Salvar
      </button>
    </form>
  )
}
