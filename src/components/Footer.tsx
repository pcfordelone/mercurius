import { GithubLogo, LinkedinLogo, User } from "phosphor-react";

export const Footer = () => {
  return (
    <footer className="mt-4 p-4 bg-gray-700">
      <div className="max-w-6xl m-auto flex items-center justify-between">
        <p className="text-orange-400">
          Featured by{" "}
          <strong className="text-yellow-500">Paulo César Fordelone</strong>
        </p>
        <div className="flex gap-2 ">
          <a href="https://github.com/pcfordelone" target={`_blank`}>
            <GithubLogo
              size={33}
              className="p-1 rounded-full bg-gray-800 border-1 border-transparent transition-colors duration-300 hover:border-yellow-500"
            />
          </a>
          <a href="https://www.linkedin.com/in/pcfordelone/" target={`_blank`}>
            <LinkedinLogo
              size={33}
              className="p-1 rounded-full bg-gray-800 border-1 border-transparent transition-colors duration-300 hover:border-yellow-500"
            />
          </a>
          <a href="https://pcfordelone.github.io/" target={`_blank`}>
            <User
              size={33}
              className="p-1 rounded-full bg-gray-800 border-1 border-transparent transition-colors duration-300 hover:border-yellow-500"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
