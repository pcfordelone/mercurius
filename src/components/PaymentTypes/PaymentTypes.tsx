import BackgroundImage from "../../assets/home-background.jpg";
import LoadingImg from "../../assets/loading.svg";
import { FilePlus, CaretDown, CaretRight, Trash } from "phosphor-react";

import { PaymentType } from "../../graphql/generated";

import { AddNewPaymentType } from "./AddNewPaymentType";
import { EditPaymentTypeForm } from "./EditPaymentType";
import { PaymentTypeItem } from "./PaymentTypeItem";
import { usePaymentTypeContext } from "../../contexts/PaymentContext/usePaymentTypes";

export const PaymentTypes: React.FC = () => {
  const {
    isEditFormActive,
    isLoading,
    editPaymentType,
    data,
    loading,
    isAddFormActive,
    paymentTypesSelected,
    handleDeletePaymentTypes,
    handleToggleForm,
  } = usePaymentTypeContext();

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center bg-gray-900 h-48 mt-48 flex-1"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="max-w-6xl py-4 m-auto flex flex-col">
        <header className="flex justify-between border-b-4 border-b-orange-400 pb-2 mt-8">
          <h1 className="font-black italic text-4xl text-yellow-500">
            Categorias
          </h1>
          {(loading || isLoading) && (
            <div className="flex items-center">
              <img className="w-10" src={LoadingImg} alt="" />
              <p>Processando...</p>
            </div>
          )}
        </header>

        <main className="mt-4">
          <div className="flex gap-2">
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
            <button
              onClick={handleDeletePaymentTypes}
              className="flex items-center px-6 gap-1 border border-gray-500 bg-gray-900 text-gray-200 p-2 rounded-2xl transition-colors duration-300	 hover:border-gray-300 disabled:text-gray-600 disabled:hover:border-gray-500"
              disabled={paymentTypesSelected.length === 0}
            >
              <Trash />
              Deletar Métodos de Pagamento Selecionados
            </button>
          </div>

          {isAddFormActive && <AddNewPaymentType />}

          {isEditFormActive && (
            <EditPaymentTypeForm paymentType={editPaymentType} />
          )}

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="z-0 w-full text-sm text-left text-gray-400 border-separate border-spacing-y-2">
              <thead className="text-sm uppercase bg-gray-800 text-yellow-500">
                <tr>
                  <th scope="col" className="px-2 py-7 text-center">
                    #
                  </th>
                  <th scope="col" className="px-6 w-[75%]">
                    Nome
                  </th>
                  <th scope="col" className="px-6 text-center">
                    Stage
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
                {data?.paymentTypes.map((paymentType) => (
                  <PaymentTypeItem
                    key={paymentType.id}
                    paymentType={paymentType as PaymentType}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};
