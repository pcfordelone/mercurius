import { FormEvent } from "react";
import { Category, ListCategoriesQuery } from "../../graphql/generated";

export interface ICategoryContext {
  isEditFormActive: boolean;
  isLoading: boolean;
  editCategory: Category | undefined;
  loading: boolean;
  isAddFormActive: boolean;
  categoriesSelected: string[];
  data: ListCategoriesQuery | undefined;
  handleDismissEditCategoryForm: (id: string, unselect?: boolean) => void;
  handleSelectCategory: (id: string, unselect?: boolean) => void;
  handleDeleteCategory: (id: string) => void;
  handleDeleteCategories: () => void;
  handleAddFormSubmit: (e: FormEvent<HTMLFormElement>, name: string) => void;
  handleEditFormSubmit: (
    e: FormEvent<HTMLFormElement>,
    id: string,
    name: string,
    isActive: boolean
  ) => void;
  handleToggleForm: () => void;
  handleEditCategoryForm: (category: Category) => Promise<void>;
}

export interface ICategoryContextProviderProps {
  children: React.ReactNode;
}
