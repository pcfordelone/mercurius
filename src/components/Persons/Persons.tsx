import BackgroundImage from "../../assets/home-background.jpg";
import LoadingImg from "../../assets/loading.svg";
import { FilePlus, CaretDown, CaretRight, Trash } from "phosphor-react";

import { Person } from "../../graphql/generated";

import { AddNewPerson } from "./AddNewPerson";
import { EditPersonForm } from "./EditPerson";
import { PersonItem } from "./PersonItem";
import { UsePersonContext } from "../../contexts/PersonContext/usePerson";

export const Persons: React.FC = () => {
  const {
    loading,
    isLoading,
    isAddFormActive,
    personsSelected,
    isEditFormActive,
    editPerson,
    data,
    handleToggleForm,
    handleDeletePersons,
  } = UsePersonContext();

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

          {isAddFormActive && <AddNewPerson />}

          {isEditFormActive && <EditPersonForm person={editPerson} />}

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
                  <PersonItem key={person.id} person={person as Person} />
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};
