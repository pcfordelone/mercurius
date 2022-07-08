export const TransactionsHeader: React.FC = () => {
  return (
    <header className="flex justify-between border-b-4 border-b-orange-400 pb-2 mt-8">
      <h1 className="flex flex-col justify-end">
        <small className="uppercase text-lg font-bold">Transações</small>
        <strong className="font-black italic text-5xl text-yellow-500">
          julho 2022
        </strong>
      </h1>
      <div className="flex-1 flex justify-end gap-2">
        <div className="w-52 flex flex-col items-center bg-gray-500 py-3 px-4 rounded-xl">
          <strong className="uppercase">total débitos</strong>
          <p className="text-4xl tracking-tighter font-black text-red-400">
            <small className="font-normal text-xl">$ </small>
            414,00
          </p>
        </div>
        <div className="w-52 flex flex-col items-center bg-gray-500 py-3 px-4 rounded-xl">
          <strong className="uppercase">total entradas</strong>
          <p className="text-4xl tracking-tighter font-black text-green-400">
            <small className="font-normal text-xl">$ </small>
            414,00
          </p>
        </div>
        <div className="w-52 flex flex-col items-center bg-gray-500 py-3 px-4 rounded-xl">
          <strong className="uppercase">total consolidado</strong>
          <p className="text-4xl tracking-tighter font-black text-green-400">
            <small className="font-normal text-xl">$ </small>
            414,00
          </p>
        </div>
      </div>
    </header>
  )
}
