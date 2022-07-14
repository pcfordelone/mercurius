import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Persons } from "../components/Persons";

export const PersonsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Persons />
      <Footer />
    </div>
  );
};
