import { Categories } from "../components/Categories";
import { Header } from "../components/Header";

export const CategoriesPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Categories />
    </div>
  );
};
