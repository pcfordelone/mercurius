import { useState, ChangeEvent, FormEvent } from "react";
import { format } from "date-fns";
import InputMask from "react-input-mask";

import { PlusCircle, XCircle } from "phosphor-react";

import {
  Category,
  PaymentType,
  Person,
  Transaction,
} from "../../graphql/generated";

interface IEditTransactionProps {
  paymentTypes: PaymentType[];
  categories: Category[];
  persons: Person[];
  isLoading: boolean;
  transaction?: Transaction | undefined;
  handleFormSubmit: (
    e: FormEvent<HTMLFormElement>,
    data: IEditTransactionFormData
  ) => void;
  dismissForm: () => void;
}

export interface IEditTransactionFormData {
  id: string;
  place: string;
  category: string;
  paymentType: string;
  person: string;
  date: string;
  transactionType: string;
  value: string;
}

export const EditTransaction: React.FC<IEditTransactionProps> = ({
  handleFormSubmit,
  paymentTypes,
  categories,
  persons,
  isLoading,
  transaction,
  dismissForm,
}: IEditTransactionProps) => {
  const [formData, setFormData] = useState<IEditTransactionFormData>({
    id: transaction?.id || "",
    place: transaction?.place || "",
    category: transaction?.category?.id || "",
    paymentType: transaction?.paymentType?.id || "",
    person: transaction?.person?.id || "",
    date: format(new Date(transaction?.date), "dd/MM/yyyy") || "",
    transactionType: transaction?.transactionType || "",
    value:
      Intl.NumberFormat("pt-BR", {
        style: "decimal",
      }).format(transaction?.value || 0) || "",
  });

  return (
    <div className="p-4 rounded-2xl border border-gray-500 mt-4 relative">
      <strong className="text-lg text-orange-300">Editar Transação</strong>
      <button
        onClick={dismissForm}
        className="text-gray-600 absolute top-2 right-2 transition-colors duration-300 hover:text-gray-400"
      >
        <XCircle size={24} />
      </button>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) =>
          handleFormSubmit(e, formData)
        }
        className="flex flex-col items-center gap-2 mt-2"
      >
        <div className="w-full flex justify-start gap-2 text-sm">
          <input
            type="text"
            placeholder="Local/Nome"
            className="flex-1 bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({
                ...formData,
                place: e.target.value,
              })
            }
            value={formData.place}
          />
          <select
            required
            className="flex-1 bg-gray-200 border-0 text-gray-800 rounded-lg px-4"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
            defaultValue={transaction?.category?.id}
          >
            <option disabled={true} value="">
              Categoria
            </option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            required
            className="flex-1 bg-gray-200 border-0 text-gray-800 rounded-lg px-4"
            defaultValue={transaction?.paymentType?.id}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFormData({
                ...formData,
                paymentType: e.target.value,
              })
            }
          >
            <option disabled hidden value="">
              Tipo de Pagamento
            </option>
            {paymentTypes.map((paymentType) => (
              <option key={paymentType.id} value={paymentType.id}>
                {paymentType.name}
              </option>
            ))}
          </select>
          <select
            required
            className="flex-1 bg-gray-200 border-0 text-gray-800 rounded-lg px-4 placeholder:text-gray-600"
            defaultValue={transaction?.person?.id}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFormData({
                ...formData,
                person: e.target.value,
              })
            }
          >
            <option disabled hidden value="">
              Familiar
            </option>
            {persons.map((person) => (
              <option key={person.id} value={person.id}>
                {person.nickname}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 text-sm">
          <InputMask
            mask="99/99/9999"
            type="text"
            placeholder="Data"
            className="w-60 bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({
                ...formData,
                date: e.target.value,
              })
            }
            value={formData.date}
          />
          <select
            required
            className="w-60 bg-gray-200 border-0 text-gray-800 rounded-lg px-4 placeholder:text-gray-600"
            defaultValue={transaction?.transactionType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFormData({
                ...formData,
                transactionType: e.target.value,
              })
            }
          >
            <option value="credit">Crédito</option>
            <option value="debit">Débito</option>
          </select>
          <input
            type="text"
            placeholder="Valor"
            className="w-60 bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({
                ...formData,
                value: e.target.value,
              })
            }
            value={formData.value.toString().replace(".", "")}
          />
          <button
            className="flex justify-center gap-2 w-36 uppercase font-bold text-md items-center bg-green-500 p-2 rounded-lg transition-colors duration-300 hover:bg-green-700 disabled:brightness-75 disabled:hover:bg-green-500"
            disabled={isLoading}
          >
            <PlusCircle size={24} />
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};
