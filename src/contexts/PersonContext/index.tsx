import { FormEvent, useState } from "react";
import bcrypt from "bcryptjs";
import { createContext } from "react";

import {
  IAddNewPersonFormData,
  IEditPersonFormData,
  IPersonContext,
  IPersonContextProviderProps,
} from "./interfaces";

import {
  Person,
  useListPersonsActivesQuery,
  useCreatePersonMutation,
  useUpdatePersonMutation,
  usePublishPersonMutation,
  useDeletePersonMutation,
  useDeletePersonsMutation,
} from "../../graphql/generated";

import { slugify } from "../../utils/slugify";
import { notify } from "../../utils/notify";
import { scrollToTop } from "../../utils/scrollToTop";

export const PersonContext = createContext<IPersonContext>(
  {} as IPersonContext
);

export const PersonContextProvider: React.FC<IPersonContextProviderProps> = ({
  children,
}: IPersonContextProviderProps) => {
  const [isAddFormActive, setIsAddFormActive] = useState(false);
  const [isEditFormActive, setIsEditFormActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editPerson, setEditPerson] = useState<Person | undefined>();
  const [personsSelected, setPersonsSelected] = useState<string[]>([]);

  const { data, loading, refetch } = useListPersonsActivesQuery();

  const [addPerson] = useCreatePersonMutation();
  const [updatePerson] = useUpdatePersonMutation();
  const [publishPerson] = usePublishPersonMutation();
  const [deletePerson] = useDeletePersonMutation();
  const [deletePersons] = useDeletePersonsMutation();

  const handleSelectPerson = (id: string, unselect?: boolean) => {
    if (unselect) {
      setPersonsSelected(personsSelected.filter((person) => person !== id));
      return;
    }
    setPersonsSelected([...personsSelected, id]);
  };

  const handleDeletePerson = (id: string) => {
    if (window.confirm("Realmente deseja apagar?")) {
      setIsLoading(true);
      scrollToTop();

      deletePerson({
        variables: {
          id: id,
        },
      })
        .then((response) => {
          notify({
            message: `Familiar ${response.data?.deletePerson?.name} excluído com sucesso`,
          });
        })
        .then(updateCache)
        .catch((error) => {
          console.log(error);
          notify({ message: error.message, type: "error" });
        });
    }
  };

  const handleDeletePersons = () => {
    if (window.confirm("Realmente deseja os familiares selecionados?")) {
      setIsLoading(true);
      scrollToTop();

      deletePersons({
        variables: {
          ids: personsSelected,
        },
      })
        .then(() => {
          notify({
            message: `Familiares excluídos com sucesso`,
          });
          setPersonsSelected([]);
        })
        .then(updateCache)
        .catch((error) => {
          console.log(error);
          notify({ message: error.message, type: "error" });
        });
    }
  };

  const handleAddFormSubmit = async (
    e: FormEvent<HTMLFormElement>,
    data: IAddNewPersonFormData
  ) => {
    e.preventDefault();
    setIsLoading(true);

    addPerson({
      variables: {
        name: data.name,
        nickname: data.nickname,
        slug: slugify(data.name),
        email: data.email,
        phone: data.phone,
      },
    })
      .then((response) => {
        notify({ message: "Familiar incluído com sucesso", type: "success" });
        const id = response.data?.createPerson?.id;
        publishPerson({
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
    data: IEditPersonFormData
  ) => {
    e.preventDefault();
    setIsLoading(true);

    updatePerson({
      variables: {
        id: id,
        name: data.name,
        nickname: data.nickname,
        slug: slugify(data.name),
        email: data.email,
        phone: data.phone,
      },
    })
      .then((response) => {
        notify({
          message: "Familiar atualizado com sucesso",
          type: "success",
        });
        const id = response.data?.updatePerson?.id;
        publishPerson({
          variables: {
            id: id,
          },
        })
          .then(updateCache)
          .then(handleDismissEditPersonForm)
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

  const handleEditPerson = async (person: Person) => {
    await handleDismissEditPersonForm();

    setEditPerson(person);
    setIsEditFormActive(true);
    scrollToTop();
  };

  const handleDismissEditPersonForm = () => {
    setEditPerson(undefined);
    setIsEditFormActive(false);
  };

  return (
    <PersonContext.Provider
      value={{
        data,
        loading,
        isAddFormActive,
        isEditFormActive,
        isLoading,
        editPerson,
        personsSelected,
        handleSelectPerson,
        handleDeletePerson,
        handleDeletePersons,
        handleAddFormSubmit,
        handleEditFormSubmit,
        updateCache,
        handleToggleForm,
        handleEditPerson,
        handleDismissEditPersonForm,
      }}
    >
      {children}
    </PersonContext.Provider>
  );
};
