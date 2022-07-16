import { Trash, PencilSimpleLine } from "phosphor-react";
import { Person } from "../../graphql/generated";
import { UsePersonContext } from "../../contexts/PersonContext/usePerson";

interface IPersonItemProps {
  person: Person;
}

export const PersonItem: React.FC<IPersonItemProps> = ({
  person,
}: IPersonItemProps) => {
  const {
    isLoading,
    handleSelectPerson,
    handleDeletePerson,
    handleEditPerson,
  } = UsePersonContext();

  return (
    <tr className="border-b bg-gray-700 border-gray-700 text-gray-300">
      <td className="px-8 py-6 text-center">
        <input
          type="checkbox"
          value={person.id}
          onChange={(e) => {
            if (e.target.checked) {
              handleSelectPerson(e.target.value);
              return;
            }
            handleSelectPerson(e.target.value, true);
          }}
        />
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-bold text-gray-200 whitespace-nowrap max-w-lg"
      >
        {person?.name}
      </th>

      <td className="px-6 py-6 text-center">{person.nickname}</td>
      <td className="px-6 py-6 text-center">{person.email}</td>
      <td className="px-6 py-6 text-center">{person.phone}</td>
      <td className="px-6 py-6 text-center">{person.stage}</td>

      <td className="px-6 py-6 text-right">
        <div className="flex gap-2 items-center justify-end">
          <button
            onClick={() => handleDeletePerson(person.id)}
            className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500 disabled:text-gray-600 disabled:hover:border-gray-600"
            disabled={isLoading}
          >
            <Trash size={20} />
          </button>
          <button
            className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500 disabled:text-gray-600 disabled:hover:border-gray-600"
            disabled={isLoading}
            onClick={() => handleEditPerson(person)}
          >
            <PencilSimpleLine size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};
