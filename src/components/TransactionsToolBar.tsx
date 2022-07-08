import { CalendarBlank, FilePlus, Trash } from 'phosphor-react'

export const TransactionsToolBar: React.FC = () => {
  return (
    <div className="flex gap-2 justify-between">
      <div className="flex gap-2">
        <button className="flex items-center px-6 gap-1 border border-gray-500 bg-black p-2 rounded-2xl transition-colors duration-300	 hover:border-gray-300">
          <FilePlus />
          Nova Transação
        </button>
        <button className="flex items-center px-6 gap-1 border border-gray-500 bg-black p-2 rounded-2xl transition-colors duration-300	 hover:border-gray-300">
          <Trash />
          Apagar Selecionados
        </button>
      </div>
      <button className="px-6 border border-gray-500 bg-black p-2 rounded-2xl transition-colors duration-300 hover:border-gray-300">
        <CalendarBlank />
      </button>
    </div>
  )
}
