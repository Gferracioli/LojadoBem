import React from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import data from "../data/produtos.json";

const NavBar = () => {
  return (
    <nav className="p-4 text-black bg-green-400">
      <div className="container m-auto flex items-center justify-between">
        <Link to="/">
          <img src="/assets/img/logo.png" alt="Logo" className="navbar-logo" />
        </Link>
        <h1>Loja do Bem</h1>

        <div className="flex items-center space-x-4">
          {data.categorias.map((categoria) => (
            <Link key={categoria.id} to={`/categoria/${categoria.id}`}>
              {categoria.nome}
            </Link>
          ))}
        </div>

        <CartWidget />
      </div>
    </nav>
  );
};

export default NavBar;
