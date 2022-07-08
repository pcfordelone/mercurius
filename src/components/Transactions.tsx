import BackgroundImage from '../assets/home-background.jpg'

import { TransactionsHeader } from './TransactionsHeader'
import { TransactionsTable } from './TransactionsTable'
import { TransactionsToolBar } from './TransactionsToolBar'

import { useState } from 'react'
import { AddNewTransaction } from './AddNewTransaction'

export const Transactions: React.FC = () => {
  const [addNewTransactionForm, setAddNewTransactionForm] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [transactionsSelected, setTransactionsSelected] = useState<string[]>([])

  const handleChangeDatePicker = (date: Date) => {
    setStartDate(date)
  }

  const handleAddNewTrasactionForm = () =>
    setAddNewTransactionForm(!addNewTransactionForm)

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center bg-gray-900 h-48 mt-48 flex-1"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="max-w-6xl py-4 m-auto flex flex-col">
        <TransactionsHeader startDate={startDate} />

        <main className="mt-6 flex flex-col gap-2">
          <TransactionsToolBar
            handleNewTransactionBtn={handleAddNewTrasactionForm}
            handleChangeDatePicker={handleChangeDatePicker}
            isActive={addNewTransactionForm}
            startDate={startDate}
          />

          {addNewTransactionForm && <AddNewTransaction />}

          <TransactionsTable />
        </main>
      </div>
    </div>
  )
}
