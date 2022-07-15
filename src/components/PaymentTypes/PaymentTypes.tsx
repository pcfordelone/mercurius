import { FormEvent, useState } from "react";

import BackgroundImage from "../../assets/home-background.jpg";
import LoadingImg from "../../assets/loading.svg";
import { FilePlus, CaretDown, CaretRight, Trash } from "phosphor-react";

import {
  PaymentType,
  useListPaymentTypesActivesQuery,
  useCreatePaymentTypeMutation,
  useUpdatePaymentTypeMutation,
  usePublishPaymentTypeMutation,
  useDeletePaymentTypeMutation,
  useDeletePaymentTypesMutation,
} from "../../graphql/generated";

import { AddNewPaymentType } from "./AddNewPaymentType";
import { EditPaymentTypeForm } from "./EditPaymentType";
import { PaymentTypeItem } from "./PaymentTypeItem";

import { slugify } from "../../utils/slugify";
import { notify } from "../../utils/notify";
import { scrollToTop } from "../../utils/scrollToTop";

export const PaymentTypes: React.FC = () => {
  const [isAddFormActive, setIsAddFormActive] = useState(false);
  const [isEditFormActive, setIsEditFormActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editPaymentType, setEditPaymentType] = useState<
    PaymentType | undefined
  >();
  const [paymentTypesSelected, setPaymentTypesSelected] = useState<string[]>(
    []
  );

  const { data, loading, refetch } = useListPaymentTypesActivesQuery();
  const [addPaymentType] = useCreatePaymentTypeMutation();
  const [updatePaymentType] = useUpdatePaymentTypeMutation();
  const [publishPaymentType] = usePublishPaymentTypeMutation();
  const [deletePaymentType] = useDeletePaymentTypeMutation();
  const [deletePaymentTypes] = useDeletePaymentTypesMutation();

  const handleSelectPaymentType = (id: string, unselect?: boolean) => {
    if (unselect) {
      setPaymentTypesSelected(
        paymentTypesSelected.filter((payment_type) => payment_type !== id)
      );
      return;
    }
    setPaymentTypesSelected([...paymentTypesSelected, id]);
  };

  const handleDeletePaymentType = (id: string) => {
    if (window.confirm("Realmente deseja apagar?")) {
      setIsLoading(true);
      scrollToTop();

      deletePaymentType({
        variables: {
          id: id,
        },
      })
        .then((response) => {
          notify({
            message: `Método de pagamento ${response.data?.deletePaymentType?.name} excluído com sucesso`,
          });
        })
        .then(updateCache)
        .catch((error) => {
          console.log(error);
          notify({ message: error.message, type: "error" });
        });
    }
  };

  const handleDeletePaymentTypes = () => {
    if (
      window.confirm("Realmente deseja os métodos de pagamento selecionadas?")
    ) {
      setIsLoading(true);
      scrollToTop();

      deletePaymentTypes({
        variables: {
          ids: paymentTypesSelected,
        },
      })
        .then(() => {
          notify({
            message: `Categorias excluídas com sucesso`,
          });
          setPaymentTypesSelected([]);
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

    addPaymentType({
      variables: {
        name: name,
        slug: slugify(name),
      },
    })
      .then((response) => {
        notify({ message: "Categoria incluída com sucesso", type: "success" });
        const id = response.data?.createPaymentType?.id;
        publishPaymentType({
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

    updatePaymentType({
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
        const id = response.data?.updatePaymentType?.id;
        publishPaymentType({
          variables: {
            id: id,
          },
        })
          .then(updateCache)
          .then(handleDismissEditPaymentTypeForm)
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

  const handleEditPaymentType = async (paymentType: PaymentType) => {
    await handleDismissEditPaymentTypeForm();

    setEditPaymentType(paymentType);
    setIsEditFormActive(true);
    scrollToTop();
  };

  const handleDismissEditPaymentTypeForm = () => {
    setEditPaymentType(undefined);
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
              Novo Método de Pagamento
              {isAddFormActive ? (
                <CaretDown size={12} />
              ) : (
                <CaretRight size={12} />
              )}
            </button>
            <button
              onClick={handleDeletePaymentTypes}
              className="flex items-center px-6 gap-1 border border-gray-500 bg-gray-900 text-gray-200 p-2 rounded-2xl transition-colors duration-300	 hover:border-gray-300 disabled:text-gray-600 disabled:hover:border-gray-500"
              disabled={paymentTypesSelected.length === 0}
            >
              <Trash />
              Deletar Métodos de Pagamento Selecionados
            </button>
          </div>

          {isAddFormActive && (
            <AddNewPaymentType
              isLoading={isLoading}
              handleFormSubmit={handleAddFormSubmit}
            />
          )}

          {isEditFormActive && (
            <EditPaymentTypeForm
              isLoading={isLoading}
              paymentType={editPaymentType}
              dismissForm={handleDismissEditPaymentTypeForm}
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
                {data?.paymentTypes.map((paymentType) => (
                  <PaymentTypeItem
                    key={paymentType.id}
                    deletePaymentType={handleDeletePaymentType}
                    paymentType={paymentType as PaymentType}
                    deleteBtnIsActive={!isLoading}
                    editPaymentType={handleEditPaymentType}
                    selectPaymentType={handleSelectPaymentType}
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
