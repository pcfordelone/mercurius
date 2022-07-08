import {
  CalendarBlank,
  CaretDown,
  CaretRight,
  FilePlus,
  Trash,
} from 'phosphor-react'

import { useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PtBr from 'date-fns/locale/pt-BR'

interface ITransactionsToolBarProps {
  isActive: boolean
  startDate: Date | null
  handleNewTransactionBtn: () => void
  handleChangeDatePicker: (date: Date) => void
}

export const TransactionsToolBar: React.FC<ITransactionsToolBarProps> = ({
  handleNewTransactionBtn,
  isActive,
  startDate,
  handleChangeDatePicker,
}: ITransactionsToolBarProps) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

  return (
    <div className="flex gap-2 justify-between">
      <div className="flex gap-2">
        <button
          onClick={handleNewTransactionBtn}
          className="flex items-center px-6 gap-1 border border-gray-500 bg-gray-900 text-gray-200 p-2 rounded-2xl transition-colors duration-300	 hover:border-gray-300"
        >
          <FilePlus />
          Nova Transação
          {isActive ? <CaretDown size={12} /> : <CaretRight size={12} />}
        </button>
        <button className="flex items-center px-6 gap-1 border border-gray-500 bg-gray-900 text-gray-200 p-2 rounded-2xl transition-colors duration-300	 hover:border-gray-300">
          <Trash />
          Apagar Selecionados
        </button>
      </div>
      <div className="flex flex-row-reverse gap-2 items-center">
        <button
          onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}
          className="px-6 border border-gray-500 bg-gray-900 text-gray-200 p-2 rounded-2xl transition-colors duration-300	 hover:border-gray-300"
        >
          <CalendarBlank size={24} />
        </button>

        {isDatePickerVisible && (
          <DatePicker
            className="text-gray-200 px-6 py-[0.5rem] rounded-xl bg-gray-900 border border-gray-500"
            selected={startDate}
            onChange={(date) => handleChangeDatePicker(date!)}
            dateFormat="MMMM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            locale={PtBr}
          />
        )}
      </div>
    </div>
  )
}
