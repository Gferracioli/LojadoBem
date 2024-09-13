import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-violet-950 shadow-md p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Link to="/">
            <img src="/assets/img/logo.png" alt="Logo" className="w-[80px]" />
          </Link>
        </div>

        {/* Developer Info and Social Icons */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <span className="text-white text-sm text-center md:text-left">
            Desenvolvido por Gustavo Ferracioli - 2024
          </span>
          <div className="flex space-x-4">
            <a
              href="https://github.com/Gferracioli/LojadoBem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/gustavo-ferracioli/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
