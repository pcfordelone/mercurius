import { Trash, PencilSimpleLine } from "phosphor-react";
import { PaymentType } from "../../graphql/generated";
import { usePaymentTypeContext } from "../../contexts/PaymentContext/usePaymentTypes";

interface IPaymentTypeItemProps {
  paymentType: PaymentType;
}

export const PaymentTypeItem: React.FC<IPaymentTypeItemProps> = ({
  paymentType,
}: IPaymentTypeItemProps) => {
  const {
    isLoading,
    handleSelectPaymentType,
    handleEditPaymentType,
    handleDeletePaymentType,
  } = usePaymentTypeContext();

  return (
    <tr className="border-b bg-gray-700 border-gray-700 text-gray-300">
      <td className="px-8 py-6 text-center">
        <input
          type="checkbox"
          value={paymentType.id}
          onChange={(e) => {
            if (e.target.checked) {
              handleSelectPaymentType(e.target.value);
              return;
            }
            handleSelectPaymentType(e.target.value, true);
          }}
        />
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-bold text-gray-200 whitespace-nowrap max-w-lg"
      >
        {paymentType?.name}
      </th>

      <td className="px-6 py-6 text-center">{paymentType.stage}</td>
      <td className="px-6 py-6 text-center">
        {paymentType?.isActive ? (
          <span className="bg-green-400 p-2 text-gray-900 font-bold rounded-lg">
            Ativo
          </span>
        ) : (
          <span className="bg-red-300 p-2 text-gray-900 font-bold rounded-lg">
            Inativo
          </span>
        )}
      </td>
      <td className="px-6 py-6 text-right">
        <div className="flex gap-2 items-center justify-end">
          <button
            onClick={() => handleDeletePaymentType(paymentType.id)}
            className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500 disabled:text-gray-600 disabled:hover:border-gray-600"
            disabled={isLoading}
          >
            <Trash size={20} />
          </button>
          <button
            className="border border-gray-600 rounded p-1 w-8 h-8 transition-colors duration-300 hover:border-yellow-500 disabled:text-gray-600 disabled:hover:border-gray-600"
            disabled={isLoading}
            onClick={() => handleEditPaymentType(paymentType)}
          >
            <PencilSimpleLine size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};
