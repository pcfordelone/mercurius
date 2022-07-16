import { PlusCircle, XCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { PaymentType } from "../../graphql/generated";
import { usePaymentTypeContext } from "../../contexts/PaymentContext/usePaymentTypes";

interface IEditPaymentTypeProps {
  paymentType?: PaymentType | undefined;
}

export const EditPaymentTypeForm: React.FC<IEditPaymentTypeProps> = ({
  paymentType,
}: IEditPaymentTypeProps) => {
  const [name, setName] = useState<string>(paymentType?.name || "");
  const [isActive, setIsActive] = useState<boolean>(
    paymentType?.isActive || false
  );

  const { isLoading, handleEditFormSubmit, handleDismissEditForm } =
    usePaymentTypeContext();

  return (
    <div className="p-4 rounded-2xl border border-gray-500 mt-4 relative">
      <strong className="text-lg text-orange-300">Editar Categoria</strong>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) =>
          handleEditFormSubmit(
            e,
            paymentType?.id as string,
            name as string,
            isActive
          )
        }
        className="flex gap-2 text-sm mb-4 mt-2"
      >
        <input
          type="text"
          placeholder="Nome"
          className="bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600 w-80"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          value={name}
        />
        <select
          required
          className="bg-gray-200 border-0 text-gray-800 rounded-lg px-4"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            if (e.target.value === "active") {
              setIsActive(true);
              return;
            }
            setIsActive(false);
          }}
          defaultValue={paymentType?.isActive ? "active" : "inactive"}
        >
          <option value="active">Ativa</option>
          <option value="inactive">Inativa</option>
        </select>
        <button
          className="flex gap-2 items-center bg-green-500 py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-green-700 disabled:brightness-75 disabled:hover:bg-green-500"
          disabled={isLoading}
        >
          <PlusCircle size={24} />
          Salvar
        </button>
      </form>
      <button
        onClick={() => handleDismissEditForm}
        className="text-gray-600 absolute top-2 right-2 transition-colors duration-300 hover:text-gray-400"
      >
        <XCircle size={24} />
      </button>
    </div>
  );
};
