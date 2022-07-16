import { PlusCircle, XCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Person } from "../../graphql/generated";
import { UsePersonContext } from "../../contexts/PersonContext/usePerson";
import { IEditPersonFormData } from "../../contexts/PersonContext/interfaces";

interface IEditPersonProps {
  person?: Person | undefined;
}

export const EditPersonForm: React.FC<IEditPersonProps> = ({
  person,
}: IEditPersonProps) => {
  const [formData, setFormData] = useState<IEditPersonFormData>({
    name: person?.name || "",
    nickname: person?.nickname || "",
    email: person?.email || "",
    phone: person?.phone || "",
  });

  const { isLoading, handleDismissEditPersonForm, handleEditFormSubmit } =
    UsePersonContext();

  return (
    <div className="p-4 rounded-2xl border border-gray-500 mt-4 relative">
      <strong className="text-lg text-orange-300">Editar Categoria</strong>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) =>
          handleEditFormSubmit(e, person?.id as string, formData)
        }
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
          value={formData.name}
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
          value={formData.nickname}
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
          value={formData.email}
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
          value={formData.phone}
        />

        <button
          className="flex gap-2 items-center bg-green-500 py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-green-700 disabled:brightness-75 disabled:hover:bg-green-500"
          disabled={isLoading}
        >
          <PlusCircle size={24} />
          Salvar
        </button>
      </form>
      <button
        onClick={handleDismissEditPersonForm}
        className="text-gray-600 absolute top-2 right-2 transition-colors duration-300 hover:text-gray-400"
      >
        <XCircle size={24} />
      </button>
    </div>
  );
};
