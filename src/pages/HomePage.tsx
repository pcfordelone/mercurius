import { Header } from "../components/Header";
import { Transactions } from "../components/Transactions";
import { Footer } from "../components/Footer";

const tableData = [
  {
    id: 1,
    place: "Supermercado Extra",
    category: "mercado",
    paymentMethod: "cartão de crédito",
    familiar: "Gabi",
    date: "17/07/2022",
    value: "R$ 130,00",
    type: "debit",
  },
  {
    id: 2,
    place: "Ifood",
    category: "comida",
    paymentMethod: "cartão de crédito",
    familiar: "PC",
    date: "17/07/2022",
    value: "R$ 32,00",
    type: "debit",
  },
  {
    id: 3,
    place: "Salário",
    category: "job",
    paymentMethod: "PIX",
    familiar: "PC",
    date: "17/07/2022",
    value: "R$ 6.500,00",
    type: "credit",
  },
];

export const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Transactions />
      <Footer />
    </div>
  );
};
