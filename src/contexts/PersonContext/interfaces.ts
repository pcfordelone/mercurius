import { FormEvent } from "react";
import { Person, ListPersonsActivesQuery } from "../../graphql/generated";

export interface IAddNewPersonFormData {
  name: string;
  nickname: string;
  email: string;
  phone: string;
}

export interface IEditPersonFormData {
  name: string;
  nickname: string;
  email: string;
  phone: string;
}

export interface IPersonContext {
  isAddFormActive: boolean;
  isEditFormActive: boolean;
  isLoading: boolean;
  editPerson: Person | undefined;
  personsSelected: string[];
  data: ListPersonsActivesQuery | undefined;
  loading: boolean;
  handleSelectPerson: (id: string, unselect?: boolean) => void;
  handleDeletePerson: (id: string) => void;
  handleDeletePersons: () => void;
  handleAddFormSubmit: (
    e: FormEvent<HTMLFormElement>,
    data: IAddNewPersonFormData
  ) => Promise<void>;
  handleEditFormSubmit: (
    e: FormEvent<HTMLFormElement>,
    id: string,
    data: IEditPersonFormData
  ) => void;
  updateCache: () => void;
  handleToggleForm: () => void;
  handleEditPerson: (person: Person) => Promise<void>;
  handleDismissEditPersonForm: () => void;
}

export interface IPersonContextProviderProps {
  children: React.ReactNode;
}
