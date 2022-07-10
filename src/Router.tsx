import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { HomePage } from "./pages/HomePage";
import { PaymentTypesPage } from "./pages/PaymentTypesPage";
import { PersonsPage } from "./pages/PersonsPage";

export function Router() {
  return (
    <Routes>
      <Route path="/auth/login" element={<AuthPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/categorias" element={<CategoriesPage />} />
      <Route path="/metodos-de-pagamento" element={<PaymentTypesPage />} />
      <Route path="/familiares" element={<PersonsPage />} />
    </Routes>
  );
}
