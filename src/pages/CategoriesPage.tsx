import { Categories } from "../components/Categories/Categories";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const CategoriesPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Categories />
      <Footer />
    </div>
  );
};
