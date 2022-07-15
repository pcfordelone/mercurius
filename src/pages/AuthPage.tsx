import LogoImg from "../assets/logo.svg";
import BackgroundImage from "../assets/home-background.jpg";
import LoadingImg from "../assets/loading.svg";

import { useAuth0 } from "@auth0/auth0-react";

export const AuthPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center flex flex-col items-center justify-center gap-4"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <img className="w-[20rem] -mt-24" src={LogoImg} alt="Mercurius Logo" />
      <div className="flex gap-2 items-center">
        <img className="w-20" src={LoadingImg} alt="Carregando" />
        <p className="-ml-4 text-xl font-bold text-gray-200">Carregando...</p>
      </div>
    </div>
  );
};
