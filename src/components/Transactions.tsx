import { CalendarBlank, FilePlus, Trash } from 'phosphor-react'
import BackgroundImage from '../assets/home-background.jpg'
import { TransactionsHeader } from './TransactionsHeader'
import { TransactionsTable } from './TransactionsTable'
import { TransactionsToolBar } from './TransactionsToolBar'

export const Transactions: React.FC = () => {
  return (
    <div
      className="w-full bg-cover bg-center bg-gray-900 h-48 mt-48 flex-1"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="max-w-6xl py-4 m-auto flex flex-col">
        <TransactionsHeader />

        <main className="mt-6 flex flex-col gap-2">
          <TransactionsToolBar />
          <TransactionsTable />
        </main>
      </div>
    </div>
  )
}
