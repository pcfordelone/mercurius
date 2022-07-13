import { PlusCircle, XCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Category } from "../../graphql/generated";

interface IEditCategoryProps {
  category?: Category | undefined;
  dismissForm: () => void;
  isLoading: boolean;
  handleFormSubmit: (
    e: FormEvent<HTMLFormElement>,
    id: string,
    name: string,
    isActive: boolean
  ) => void;
}
export const EditCategoryForm: React.FC<IEditCategoryProps> = ({
  category,
  dismissForm,
  handleFormSubmit,
  isLoading,
}: IEditCategoryProps) => {
  const [name, setName] = useState<string>(category?.name || "");
  const [isActive, setIsActive] = useState<boolean>(
    category?.isActive || false
  );

  return (
    <div className="p-4 rounded-2xl border border-gray-500 mt-4 relative">
      <strong className="text-lg text-orange-300">Editar Categoria</strong>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) =>
          handleFormSubmit(e, category?.id as string, name as string, isActive)
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
          defaultValue={category?.isActive ? "active" : "inactive"}
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
        onClick={dismissForm}
        className="text-gray-600 absolute top-2 right-2 transition-colors duration-300 hover:text-gray-400"
      >
        <XCircle size={24} />
      </button>
    </div>
  );
};
