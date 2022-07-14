import { House, SignOut } from "phosphor-react";
import { Link } from "react-router-dom";
import LogoImg from "../assets/logo.svg";

export const Header: React.FC = () => {
  return (
    <main className="z-10 fixed w-full bg-gray-800 border-b-8 border-orange-500">
      <div className="max-w-6xl h-48 py-4 m-auto flex justify-between">
        <img className="max-h-max" src={LogoImg} alt="Mercurius Logo" />
        <div className="flex flex-col items-end justify-between">
          <button className="py-1 px-4 border-2 rounded-xl border-gray-500 text-yellow-500 transition-colors duration-300 hover:border-orange-400">
            <SignOut size={36} />
          </button>
          <nav>
            <ul className="flex items-center gap-2 font-black italic text-lg">
              <li className="py-1 px-4 border-2 rounded-xl border-gray-500 text-yellow-500 transition-colors duration-300 hover:border-orange-400 active:border-gray-100">
                <Link to="/">
                  <House size={36} />
                </Link>
              </li>
              <li className="py-2 px-4 border-2 rounded-xl border-gray-500 text-yellow-500 transition-colors duration-300 hover:border-orange-400">
                <Link to="/categorias">Categorias</Link>
              </li>
              <li className="py-2 px-4 border-2 rounded-xl border-gray-500 text-yellow-500 transition-colors duration-300 hover:border-orange-400">
                <Link to="/metodos-de-pagamento">Meios de Pagamento</Link>
              </li>
              <li className="py-2 px-4 border-2 rounded-xl border-gray-500 text-yellow-500 transition-colors duration-300 hover:border-orange-400">
                <Link to="/familiares">Familiares</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
};
