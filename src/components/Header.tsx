import { useAuth0 } from "@auth0/auth0-react";
import { House, SignOut } from "phosphor-react";
import { Link } from "react-router-dom";
import LogoImg from "../assets/logo.svg";

export const Header: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <main className="z-10 fixed w-full bg-gray-800 border-b-8 border-orange-500">
      <div className="max-w-6xl h-48 py-4 m-auto flex justify-between">
        <img className="max-h-max" src={LogoImg} alt="Mercurius Logo" />
        <div className="flex flex-col items-end justify-between">
          <button
            onClick={() => logout()}
            className="py-1 px-4 border-2 rounded-xl border-gray-500 text-yellow-500 transition-colors duration-300 hover:border-orange-400"
          >
            <SignOut size={36} />
          </button>
          <nav>
            <ul className="flex items-center gap-2 font-black italic text-lg">
              <Link to="/">
                <li className="pointer-events-auto py-1 px-4 border-2 rounded-xl border-gray-500 text-yellow-500 transition-colors duration-300 hover:border-orange-400 active:border-gray-100">
                  <House size={36} />
                </li>
              </Link>
              <Link to="/categorias">
                <li className="py-2 px-4 border-2 rounded-xl border-gray-500 text-yellow-500 transition-colors duration-300 hover:border-orange-400">
                  Categorias
                </li>
              </Link>
              <Link to="/metodos-de-pagamento">
                <li className="py-2 px-4 border-2 rounded-xl border-gray-500 text-yellow-500 transition-colors duration-300 hover:border-orange-400">
                  Meios de Pagamento
                </li>
              </Link>
              <Link to="/familiares">
                <li className="py-2 px-4 border-2 rounded-xl border-gray-500 text-yellow-500 transition-colors duration-300 hover:border-orange-400">
                  Familiares
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
};
