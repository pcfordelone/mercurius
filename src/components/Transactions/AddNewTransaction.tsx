import { PlusCircle } from "phosphor-react";

import InputMask from "react-input-mask";
import { Category, PaymentType, Person } from "../../graphql/generated";
import { useState, ChangeEvent, FormEvent } from "react";

interface IAddNewTransactionProps {
  paymentTypes: PaymentType[];
  categories: Category[];
  persons: Person[];
  handleFormSubmit: (
    e: FormEvent<HTMLFormElement>,
    data: INewTransactionFormData
  ) => void;
  isLoading: boolean;
}

export interface INewTransactionFormData {
  place: string;
  category: string;
  paymentType: string;
  person: string;
  date: string;
  transactionType: string;
  value: string;
}

export const AddNewTransaction: React.FC<IAddNewTransactionProps> = ({
  handleFormSubmit,
  paymentTypes,
  categories,
  persons,
  isLoading,
}: IAddNewTransactionProps) => {
  const [formData, setFormData] = useState<INewTransactionFormData>({
    place: "",
    category: "",
    paymentType: "",
    person: "",
    date: "",
    transactionType: "credit",
    value: "",
  });

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        handleFormSubmit(e, formData)
      }
      className="flex flex-col items-center gap-2 mt-2 p-4 border border-gray-700 rounded-xl"
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
        />
        <select
          required
          className="flex-1 bg-gray-200 border-0 text-gray-800 rounded-lg px-4"
          value={formData.category}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
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
          value={formData.paymentType}
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
          value={formData.person}
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
        />
        <select
          required
          className="w-60 bg-gray-200 border-0 text-gray-800 rounded-lg px-4 placeholder:text-gray-600"
          value={formData.transactionType}
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
  );
};
