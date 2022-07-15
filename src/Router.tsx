import { Route, Routes } from "react-router-dom";
import { PrivatePage } from "./components/PrivatePages";
import { AuthPage } from "./pages/AuthPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { HomePage } from "./pages/HomePage";
import { PaymentTypesPage } from "./pages/PaymentTypesPage";
import { PersonsPage } from "./pages/PersonsPage";

export function Router() {
  return (
    <Routes>
      <Route path="/auth/login" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <PrivatePage>
            <HomePage />
          </PrivatePage>
        }
      />
      <Route
        path="/categorias"
        element={
          <PrivatePage>
            <CategoriesPage />
          </PrivatePage>
        }
      />
      <Route
        path="/metodos-de-pagamento"
        element={
          <PrivatePage>
            <PaymentTypesPage />
          </PrivatePage>
        }
      />
      <Route
        path="/familiares"
        element={
          <PrivatePage>
            <PersonsPage />
          </PrivatePage>
        }
      />
    </Routes>
  );
}
