import BackgroundImage from "../../assets/home-background.jpg";
import LoadingImg from "../../assets/loading.svg";

import { FilePlus, CaretDown, CaretRight, Trash } from "phosphor-react";
import { FormEvent, useRef, useState } from "react";

import {
  Category,
  useListCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../graphql/generated";
import {
  useCreateCategoryMutation,
  usePublishCategoryMutation,
} from "../../graphql/generated";

import { CategoryItem } from "./CategoryItem";
import { AddNewCategory } from "./AddNewCategory";
import { EditCategoryForm } from "./EditCategory";

import { slugify } from "../../utils/slugify";
import { notify } from "../../utils/notify";
import {
  useUpdateCategoryMutation,
  useDeleteCategoriesMutation,
} from "../../graphql/generated";

export const Categories: React.FC = () => {
  const [isAddFormActive, setIsAddFormActive] = useState(false);
  const [isEditFormActive, setIsEditFormActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | undefined>();
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);

  const startRef = useRef<HTMLDivElement>(null);

  function handleScrollToStart() {
    startRef.current?.scrollIntoView({ behavior: "smooth" });
    window.scrollBy(0, -100);
  }

  const { data, loading, refetch } = useListCategoriesQuery();
  const [addCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [publishCategory] = usePublishCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteCategories] = useDeleteCategoriesMutation();

  const handleSelectCategory = (id: string, unselect?: boolean) => {
    if (unselect) {
      setCategoriesSelected(
        categoriesSelected.filter((category) => category !== id)
      );
      return;
    }
    setCategoriesSelected([...categoriesSelected, id]);
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm("Realmente deseja apagar?")) {
      setIsLoading(true);
      handleScrollToStart();

      deleteCategory({
        variables: {
          id: id,
        },
      })
        .then((response) => {
          notify({
            message: `Categoria ${response.data?.deleteCategory?.name} excluída com sucesso`,
          });
        })
        .then(updateCache)
        .catch((error) => {
          console.log(error);
          notify({ message: error.message, type: "error" });
        });
    }
  };

  const handleDeleteCategories = () => {
    if (window.confirm("Realmente deseja as categorias selecionadas?")) {
      setIsLoading(true);
      handleScrollToStart();

      deleteCategories({
        variables: {
          ids: categoriesSelected,
        },
      })
        .then(() => {
          notify({
            message: `Categorias excluídas com sucesso`,
          });
          setCategoriesSelected([]);
        })
        .then(updateCache)
        .catch((error) => {
          console.log(error);
          notify({ message: error.message, type: "error" });
        });
    }
  };

  const handleAddFormSubmit = (e: FormEvent<HTMLFormElement>, name: string) => {
    e.preventDefault();
    setIsLoading(true);

    addCategory({
      variables: {
        name: name,
        slug: slugify(name),
      },
    })
      .then((response) => {
        notify({ message: "Categoria incluída com sucesso", type: "success" });
        const id = response.data?.createCategory?.id;
        publishCategory({
          variables: {
            id: id,
          },
        })
          .then(updateCache)
          .catch((error) => {
            console.log(error);
            notify({ message: error.message, type: "error" });
          });
      })
      .catch((error) => {
        console.log(error);
        notify({ message: error.message, type: "error" });
      });
  };

  const handleEditFormSubmit = (
    e: FormEvent<HTMLFormElement>,
    id: string,
    name: string,
    isActive: boolean
  ) => {
    e.preventDefault();
    setIsLoading(true);

    updateCategory({
      variables: {
        id: id,
        name: name,
        slug: slugify(name),
        isActive: isActive || false,
      },
    })
      .then((response) => {
        notify({
          message: "Categoria atualizada com sucesso",
          type: "success",
        });
        const id = response.data?.updateCategory?.id;
        publishCategory({
          variables: {
            id: id,
          },
        })
          .then(updateCache)
          .then(handleDismissEditCategoryForm)
          .catch((error) => {
            console.log(error);
            notify({ message: error.message, type: "error" });
          });
      })
      .catch((error) => {
        console.log(error);
        notify({ message: error.message, type: "error" });
      });
  };

  const updateCache = () => {
    setIsAddFormActive(false);

    refetch()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        notify({ message: error.message, type: "error" });
      });
  };

  const handleToggleForm = () => {
    setIsAddFormActive(!isAddFormActive);
  };

  const handleEditCategoryForm = async (category: Category) => {
    await handleDismissEditCategoryForm();

    setEditCategory(category);
    setIsEditFormActive(true);
  };

  const handleDismissEditCategoryForm = () => {
    setEditCategory(undefined);
    setIsEditFormActive(false);
  };

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center bg-gray-900 h-48 mt-48 flex-1"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
      ref={startRef}
    >
      <div className="max-w-6xl py-4 m-auto flex flex-col">
        <header className="flex justify-between border-b-4 border-b-orange-400 pb-2 mt-8">
          <h1 className="font-black italic text-4xl text-yellow-500">
            Categorias
          </h1>
          {(loading || isLoading) && (
            <div className="flex items-center">
              <img className="w-10" src={LoadingImg} alt="" />
              <p>Processando...</p>
            </div>
          )}
        </header>

        <main className="mt-4">
          <div className="flex gap-2">
            <button
              onClick={handleToggleForm}
              className="flex items-center px-6 gap-1 border border-gray-500 bg-gray-900 text-gray-200 p-2 rounded-2xl transition-colors duration-300	 hover:border-gray-300"
            >
              <FilePlus />
              Nova Categoria
              {isAddFormActive ? (
                <CaretDown size={12} />
              ) : (
                <CaretRight size={12} />
              )}
            </button>
            <button
              onClick={handleDeleteCategories}
              className="flex items-center px-6 gap-1 border border-gray-500 bg-gray-900 text-gray-200 p-2 rounded-2xl transition-colors duration-300	 hover:border-gray-300 disabled:text-gray-600 disabled:hover:border-gray-500"
              disabled={categoriesSelected.length === 0}
            >
              <Trash />
              Deletar Categorias Selecionadas
            </button>
          </div>

          {isAddFormActive && (
            <AddNewCategory
              isLoading={isLoading}
              handleFormSubmit={handleAddFormSubmit}
            />
          )}

          {isEditFormActive && (
            <EditCategoryForm
              isLoading={isLoading}
              dismissForm={handleDismissEditCategoryForm}
              category={editCategory}
              handleFormSubmit={handleEditFormSubmit}
            />
          )}

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="z-0 w-full text-sm text-left text-gray-400 border-separate border-spacing-y-2">
              <thead className="text-sm uppercase bg-gray-800 text-yellow-500">
                <tr>
                  <th scope="col" className="px-2 py-7 text-center">
                    #
                  </th>
                  <th scope="col" className="px-6 w-[75%]">
                    Nome
                  </th>
                  <th scope="col" className="px-6 text-center">
                    Stage
                  </th>
                  <th scope="col" className="px-6 text-center">
                    Status
                  </th>
                  <th scope="col" className="px-6 text-right">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.categories.map((category) => (
                  <CategoryItem
                    key={category.id}
                    deleteCategory={handleDeleteCategory}
                    category={category as Category}
                    deleteBtnIsActive={!isLoading}
                    editCategory={handleEditCategoryForm}
                    selectCategory={handleSelectCategory}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};
