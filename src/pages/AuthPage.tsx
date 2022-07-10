import LogoImg from "../assets/logo.svg";
import BackgroundImage from "../assets/home-background.jpg";
import { ChangeEvent, useState } from "react";

export const AuthPage: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <img className="w-[20rem] -mt-24" src={LogoImg} alt="Mercurius Logo" />
      <form className="flex flex-col align gap-2 mt-10">
        <input
          className="rounded p-4 w-96 bg-gray-800 border border-gray-700 outline-none focus:border-yellow-500"
          type="email"
          placeholder="Digite o email de cadastro"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <input
          className="rounded p-4 w-96 bg-gray-800 border border-gray-700 outline-none focus:border-yellow-500"
          type="password"
          placeholder="Digite sua senha"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button className="rounded p-4 bg-orange-600 mt-6 font-bold uppercase transition-colors duration-300 hover:bg-orange-800 outline-none focus:border-white">
          Entrar
        </button>
      </form>
    </div>
  );
};
