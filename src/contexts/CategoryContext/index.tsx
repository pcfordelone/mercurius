import { createContext, FormEvent, useState } from "react";

import {
  Category,
  useListCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  usePublishCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteCategoriesMutation,
} from "../../graphql/generated";

import { notify } from "../../utils/notify";
import { scrollToTop } from "../../utils/scrollToTop";
import { slugify } from "../../utils/slugify";
import { ICategoryContext, ICategoryContextProviderProps } from "./interfaces";

export const CategoryContext = createContext<ICategoryContext>(
  {} as ICategoryContext
);

export const CategoryContextProvider: React.FC<
  ICategoryContextProviderProps
> = ({ children }: ICategoryContextProviderProps) => {
  const [isAddFormActive, setIsAddFormActive] = useState(false);
  const [isEditFormActive, setIsEditFormActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | undefined>();
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);

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
      scrollToTop();

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
      scrollToTop();

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
    scrollToTop();
  };

  const handleDismissEditCategoryForm = () => {
    setEditCategory(undefined);
    setIsEditFormActive(false);
  };

  return (
    <CategoryContext.Provider
      value={{
        isEditFormActive,
        isLoading,
        editCategory,
        loading,
        isAddFormActive,
        categoriesSelected,
        data,
        handleDismissEditCategoryForm,
        handleSelectCategory,
        handleDeleteCategory,
        handleDeleteCategories,
        handleAddFormSubmit,
        handleEditFormSubmit,
        handleToggleForm,
        handleEditCategoryForm,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
