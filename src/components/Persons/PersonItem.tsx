import { Trash, PencilSimpleLine } from "phosphor-react";
import { Person } from "../../graphql/generated";

interface IPersonItemProps {
  person: Person;
  deleteBtnIsActive: boolean;
  deletePerson: (id: string) => void;
  editPerson: (person: Person) => void;
  selectPerson: (id: string, unselect?: boolean) => void;
}

export const PersonItem: React.FC<IPersonItemProps> = ({
  person,
  deleteBtnIsActive,
  deletePerson,
  editPerson,
  selectPerson,
}: IPersonItemProps) => {
  return (
    <tr className="border-b bg-gray-700 border-gray-700 text-gray-300">
      <td className="px-8 py-6 text-center">
        <input
          type="checkbox"
          value={person.id}
          onChange={(e) => {
            if (e.target.checked) {
              selectPerson(e.target.value);
              return;
            }
            selectPerson(e.target.value, true);
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
            onClick={() => deletePerson(person.id)}
            className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500 disabled:text-gray-600 disabled:hover:border-gray-600"
            disabled={!deleteBtnIsActive}
          >
            <Trash size={20} />
          </button>
          <button
            className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500 disabled:text-gray-600 disabled:hover:border-gray-600"
            disabled={!deleteBtnIsActive}
            onClick={() => editPerson(person)}
          >
            <PencilSimpleLine size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};
