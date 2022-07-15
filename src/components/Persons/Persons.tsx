import { FormEvent, useRef, useState } from "react";
import bcrypt from "bcryptjs";

import BackgroundImage from "../../assets/home-background.jpg";
import LoadingImg from "../../assets/loading.svg";
import { FilePlus, CaretDown, CaretRight, Trash } from "phosphor-react";

import {
  Person,
  useListPersonsActivesQuery,
  useCreatePersonMutation,
  useUpdatePersonMutation,
  usePublishPersonMutation,
  useDeletePersonMutation,
  useDeletePersonsMutation,
} from "../../graphql/generated";

import { IAddNewPersonFormData, IEditPersonFormData } from "./interfaces";
import { AddNewPerson } from "./AddNewPerson";
import { EditPersonForm } from "./EditPerson";
import { PersonItem } from "./PersonItem";

import { slugify } from "../../utils/slugify";
import { notify } from "../../utils/notify";
import { scrollToTop } from "../../utils/scrollToTop";

export const Persons: React.FC = () => {
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

  const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  };

  const handleAddFormSubmit = async (
    e: FormEvent<HTMLFormElement>,
    data: IAddNewPersonFormData
  ) => {
    e.preventDefault();
    setIsLoading(true);

    if (data.password !== data.passwordConfirmation) {
      notify({
        message: "Senhas não são iguais",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    const hashedPassword = await hashPassword(data.password);

    addPerson({
      variables: {
        name: data.name,
        nickname: data.nickname,
        slug: slugify(data.name),
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
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
    <div
      className="w-full bg-fixed bg-cover bg-center bg-gray-900 h-48 mt-48 flex-1"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="max-w-6xl py-4 m-auto flex flex-col">
        <header className="flex justify-between border-b-4 border-b-orange-400 pb-2 mt-8">
          <h1 className="font-black italic text-4xl text-yellow-500">
            Familiares
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
              Novo Familiar
              {isAddFormActive ? (
                <CaretDown size={12} />
              ) : (
                <CaretRight size={12} />
              )}
            </button>
            <button
              onClick={handleDeletePersons}
              className="flex items-center px-6 gap-1 border border-gray-500 bg-gray-900 text-gray-200 p-2 rounded-2xl transition-colors duration-300	 hover:border-gray-300 disabled:text-gray-600 disabled:hover:border-gray-500"
              disabled={personsSelected.length === 0}
            >
              <Trash />
              Deletar Familiares Selecionados
            </button>
          </div>

          {isAddFormActive && (
            <AddNewPerson
              isLoading={isLoading}
              handleFormSubmit={handleAddFormSubmit}
            />
          )}

          {isEditFormActive && (
            <EditPersonForm
              isLoading={isLoading}
              person={editPerson}
              dismissForm={handleDismissEditPersonForm}
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
                  <th scope="col" className="px-6">
                    Nome
                  </th>
                  <th scope="col" className="px-6 text-center">
                    Apelido
                  </th>
                  <th scope="col" className="px-6 text-center">
                    E-mail
                  </th>
                  <th scope="col" className="px-6 text-center">
                    Telefone
                  </th>
                  <th scope="col" className="px-6 text-center">
                    Stage
                  </th>
                  <th scope="col" className="px-6 text-right">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.people.map((person) => (
                  <PersonItem
                    key={person.id}
                    deletePerson={handleDeletePerson}
                    person={person as Person}
                    deleteBtnIsActive={!isLoading}
                    editPerson={handleEditPerson}
                    selectPerson={handleSelectPerson}
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
