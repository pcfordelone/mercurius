import BackgroundImage from "../assets/home-background.jpg";
import {
  Trash,
  PencilSimpleLine,
  FilePlus,
  CaretDown,
  CaretRight,
} from "phosphor-react";
import { useState } from "react";
import { PlusCircle } from "phosphor-react";

export const PaymentTypes: React.FC = () => {
  const [isAddFormActive, setIsAddFormActive] = useState(false);

  const handleToggleForm = () => {
    setIsAddFormActive(!isAddFormActive);
  };

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center bg-gray-900 h-48 mt-48 flex-1"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="max-w-6xl py-4 m-auto flex flex-col">
        <header className="flex justify-between border-b-4 border-b-orange-400 pb-2 mt-8">
          <h1 className="font-black italic text-4xl text-yellow-500">
            Métodos de Pagamento
          </h1>
        </header>

        <main className="mt-4">
          <button
            onClick={handleToggleForm}
            className="flex items-center px-6 gap-1 border border-gray-500 bg-gray-900 text-gray-200 p-2 rounded-2xl transition-colors duration-300	 hover:border-gray-300"
          >
            <FilePlus />
            Novo Método de Pagamento
            {isAddFormActive ? (
              <CaretDown size={12} />
            ) : (
              <CaretRight size={12} />
            )}
          </button>

          {isAddFormActive && (
            <form className="flex gap-2 text-sm mb-4 mt-2">
              <input
                type="text"
                placeholder="Nome"
                className="bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600"
              />
              <button className="flex gap-2 items-center bg-green-500 py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-green-700">
                <PlusCircle size={24} />
                Salvar
              </button>
            </form>
          )}

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-400 border-separate border-spacing-y-2">
              <thead className="text-sm uppercase bg-gray-800 text-yellow-500">
                <tr>
                  <th scope="col" className="px-2 py-7 text-center">
                    #
                  </th>
                  <th scope="col" className="px-6">
                    Nome
                  </th>
                  <th scope="col" className="px-6 text-center">
                    Status
                  </th>
                  <th scope="col" className="px-6 text-right">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-gray-700 border-gray-700 text-gray-300">
                  <td className="px-2 py-6 text-center">
                    <input type="checkbox" />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold text-gray-200 whitespace-nowrap max-w-lg"
                  >
                    Mercado
                  </th>
                  <td className="px-6 py-6 text-center">
                    <span className="bg-green-400 p-2 text-gray-900 font-bold rounded-lg">
                      Ativo
                    </span>
                    <span className="bg-red-400 p-2 text-gray-900 font-bold rounded-lg">
                      Desativada
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex gap-2 items-center justify-end">
                      <button className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500">
                        <Trash size={20} />
                      </button>
                      <button className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500">
                        <PencilSimpleLine size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};
