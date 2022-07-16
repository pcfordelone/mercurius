import { Categories } from "../components/Categories/Categories";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { CategoryContextProvider } from "../contexts/CategoryContext";

export const CategoriesPage: React.FC = () => {
  return (
    <CategoryContextProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Categories />
        <Footer />
      </div>
    </CategoryContextProvider>
  );
};
