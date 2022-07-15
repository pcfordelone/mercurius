import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { IAddNewPersonFormData } from "./interfaces";

interface IAddNewPersonProps {
  handleFormSubmit: (
    e: FormEvent<HTMLFormElement>,
    data: IAddNewPersonFormData
  ) => void;
  isLoading: boolean;
}
export const AddNewPerson: React.FC<IAddNewPersonProps> = ({
  handleFormSubmit,
  isLoading,
}: IAddNewPersonProps) => {
  const [formData, setFormData] = useState<IAddNewPersonFormData>({
    name: "",
    nickname: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
  });

  return (
    <form
      onSubmit={(e) => handleFormSubmit(e, formData)}
      className="flex gap-2 text-sm mb-4 mt-2"
    >
      <input
        type="text"
        placeholder="Nome"
        className="bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600 w-80"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
      />
      <input
        type="text"
        placeholder="Apelido"
        className="bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600 w-80"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({
            ...formData,
            nickname: e.target.value,
          })
        }
      />
      <input
        type="email"
        placeholder="E-mail"
        className="bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600 w-80"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({
            ...formData,
            email: e.target.value,
          })
        }
      />
      <input
        type="text"
        placeholder="Telefone"
        className="bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600 w-80"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({
            ...formData,
            phone: e.target.value,
          })
        }
      />
      <input
        type="password"
        placeholder="Senha"
        className="bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600 w-80"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({
            ...formData,
            password: e.target.value,
          })
        }
      />
      <input
        type="password"
        placeholder="Redigite sua senha"
        className="bg-gray-200 border-0 text-gray-800 rounded-lg p-4 placeholder:text-gray-600 w-80"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({
            ...formData,
            passwordConfirmation: e.target.value,
          })
        }
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