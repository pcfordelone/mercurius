import { Trash, PencilSimpleLine } from "phosphor-react";
import { Category } from "../../graphql/generated";
import { useCategoryContext } from "../../contexts/CategoryContext/useCategory";

interface ICategoryItemProps {
  category: Category;
}

export const CategoryItem: React.FC<ICategoryItemProps> = ({
  category,
}: ICategoryItemProps) => {
  const {
    isLoading,
    handleSelectCategory,
    handleDeleteCategory,
    handleEditCategoryForm,
  } = useCategoryContext();

  return (
    <tr className="border-b bg-gray-700 border-gray-700 text-gray-300">
      <td className="px-8 py-6 text-center">
        <input
          type="checkbox"
          value={category.id}
          onChange={(e) => {
            if (e.target.checked) {
              handleSelectCategory(e.target.value);
              return;
            }
            handleSelectCategory(e.target.value, true);
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
            onClick={() => handleDeleteCategory(category.id)}
            className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500 disabled:text-gray-600 disabled:hover:border-gray-600"
            disabled={isLoading}
          >
            <Trash size={20} />
          </button>
          <button
            className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500 disabled:text-gray-600 disabled:hover:border-gray-600"
            disabled={isLoading}
            onClick={() => handleEditCategoryForm(category)}
          >
            <PencilSimpleLine size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};
