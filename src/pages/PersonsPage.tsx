import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Persons } from "../components/Persons/Persons";
import { PersonContextProvider } from "../contexts/PersonContext";

export const PersonsPage: React.FC = () => {
  return (
    <PersonContextProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Persons />
        <Footer />
      </div>
    </PersonContextProvider>
  );
};
