import { Trash, PencilSimpleLine } from "phosphor-react";
import { Category } from "../../graphql/generated";

interface ICategoryItemProps {
  category: Category;
  deleteCategory: (id: string) => void;
  deleteBtnIsActive: boolean;
  editCategory: (category: Category) => void;
  selectCategory: (id: string, unselect?: boolean) => void;
}

export const CategoryItem: React.FC<ICategoryItemProps> = ({
  category,
  deleteCategory,
  deleteBtnIsActive,
  editCategory,
  selectCategory,
}: ICategoryItemProps) => {
  return (
    <tr className="border-b bg-gray-700 border-gray-700 text-gray-300">
      <td className="px-8 py-6 text-center">
        <input
          type="checkbox"
          value={category.id}
          onChange={(e) => {
            if (e.target.checked) {
              selectCategory(e.target.value);
              return;
            }
            selectCategory(e.target.value, true);
          }}
        />
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-bold text-gray-200 whitespace-nowrap max-w-lg"
      >
        {category?.name}
      </th>

      <td className="px-6 py-6 text-center">{category.stage}</td>
      <td className="px-6 py-6 text-center">
        {category?.isActive ? (
          <span className="bg-green-400 p-2 text-gray-900 font-bold rounded-lg">
            Ativa
          </span>
        ) : (
          <span className="bg-red-300 p-2 text-gray-900 font-bold rounded-lg">
            Inativa
          </span>
        )}
      </td>
      <td className="px-6 py-6 text-right">
        <div className="flex gap-2 items-center justify-end">
          <button
            onClick={() => deleteCategory(category.id)}
            className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500 disabled:text-gray-600 disabled:hover:border-gray-600"
            disabled={!deleteBtnIsActive}
          >
            <Trash size={20} />
          </button>
          <button
            className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500 disabled:text-gray-600 disabled:hover:border-gray-600"
            disabled={!deleteBtnIsActive}
            onClick={() => editCategory(category)}
          >
            <PencilSimpleLine size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};
