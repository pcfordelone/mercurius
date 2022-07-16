import { createContext, FormEvent, useState } from "react";

import { notify } from "../../utils/notify";
import { scrollToTop } from "../../utils/scrollToTop";
import { slugify } from "../../utils/slugify";
import {
  PaymentType,
  useCreatePaymentTypeMutation,
  useDeletePaymentTypeMutation,
  useDeletePaymentTypesMutation,
  useListPaymentTypesActivesQuery,
  usePublishPaymentTypeMutation,
  useUpdatePaymentTypeMutation,
} from "../../graphql/generated";

import {
  IPaymentTypeContext,
  IPaymentTypeContextProviderProps,
} from "./interfaces";

export const PaymentTypeContext = createContext<IPaymentTypeContext>(
  {} as IPaymentTypeContext
);

export const PaymentTypeContextProvider: React.FC<
  IPaymentTypeContextProviderProps
> = ({ children }: IPaymentTypeContextProviderProps) => {
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
          .then(handleDismissEditForm)
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
    await handleDismissEditForm();

    setEditPaymentType(paymentType);
    setIsEditFormActive(true);
    scrollToTop();
  };

  const handleDismissEditForm = () => {
    setEditPaymentType(undefined);
    setIsEditFormActive(false);
  };

  return (
    <PaymentTypeContext.Provider
      value={{
        isEditFormActive,
        isLoading,
        editPaymentType,
        data,
        loading,
        isAddFormActive,
        paymentTypesSelected,
        handleSelectPaymentType,
        handleDeletePaymentType,
        handleDeletePaymentTypes,
        handleAddFormSubmit,
        handleEditFormSubmit,
        handleToggleForm,
        handleEditPaymentType,
        handleDismissEditForm,
      }}
    >
      {children}
    </PaymentTypeContext.Provider>
  );
};
