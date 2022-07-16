import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { usePaymentTypeContext } from "../../contexts/PaymentContext/usePaymentTypes";

export const AddNewPaymentType: React.FC = () => {
  const [name, setName] = useState("");
  const { isLoading, handleAddFormSubmit } = usePaymentTypeContext();

  return (
    <form
      onSubmit={(e) => handleAddFormSubmit(e, name)}
      className="flex gap-2 text-sm mb-4 mt-2"
    >
      <input
        type="text"
        placeholder="Nome"
        className="bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600 w-80"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <button
        className="flex gap-2 items-center bg-green-500 py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-green-700 disabled:brightness-75 disabled:hover:bg-green-500"
        disabled={isLoading}
      >
        <PlusCircle size={24} />
        Salvar
      </button>
    </form>
  );
};
