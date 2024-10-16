import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { CiMenuBurger } from "react-icons/ci";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface Categoria {
  id: string;
  nome: string;
}

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriaCollectionRef = collection(db, "Categorias");
        const categoriaSnapshot = await getDocs(categoriaCollectionRef);
        const categoriaList = categoriaSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Categoria[];

        setCategorias(categoriaList);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-violet-950 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4 md:p-0">
        <div className="md:hidden flex items-center justify-between w-full">
          <div className="mr-4">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <CiMenuBurger className="w-8 h-8" />
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <Link to="/">
              <img src="/assets/img/logo.png" alt="Logo" className="w-[80px] h-auto" />
            </Link>
          </div>

          <div className="ml-2">
            <CartWidget />
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img src="/assets/img/logo.png" alt="Logo" className="w-25 h-25" />
            </Link>
            <h1 className="text-2xl font-bold text-white hidden">Loja do Bem</h1>
          </div>

          <div className="flex space-x-8 text-white">
            {categorias.map((categoria) => (
              <Link
                key={categoria.id}
                to={`/categoria/${categoria.nome}`}
                className="text-lg hover:text-gray-300 transition-colors"
              >
                {categoria.nome}
              </Link>
            ))}
            <Link to="/oprojeto" className="text-lg hover:text-gray-300 transition-colors">
              O Projeto
            </Link>
          </div>

          <CartWidget />
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 bg-green-500 text-white space-y-2 p-4">
          {categorias.map((categoria) => (
            <Link
              key={categoria.id}
              to={`/categoria/${categoria.nome}`}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-gray-300 transition-colors"
            >
              {categoria.nome}
            </Link>
          ))} 
          <Link
            to="/oprojeto"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-300 transition-colors"
          >
            O Projeto
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
