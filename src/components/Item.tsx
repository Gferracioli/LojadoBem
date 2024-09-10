import React, { useState } from "react";
import ItemCount from "./ItemCount";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Importa o contexto do carrinho
import { Produto } from "../interfaces/produto.interface";

const Item = (produto: Produto) => {
  const { addItem, isInCart } = useCart(); // Usar o contexto do carrinho
  const [addedToCart, setAddedToCart] = useState(isInCart(produto.id)); 

  const handleAddToCart = (quantidade: number) => {
    addItem(produto, quantidade);
    setAddedToCart(true); // Atualiza o estado local para mostrar o botão "Adicionado ao carrinho"
  };

  return (
    <div className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 m-4 flex flex-col justify-between">
      <img src={produto.imagemUrl} alt={produto.nome} className="w-full h-48 object-cover" />

      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-xl font-bold mb-2">{produto.nome}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{produto.descricao}</p>
        <p className="text-lg font-semibold text-gray-800 mb-2">{`Preço: R$ ${produto.price}`}</p>
        <p className="text-sm text-gray-600 mb-4">{`Quantidade disponível: ${produto.estoque}`}</p>

        <div className="flex justify-center items-center mt-2 ">
          {addedToCart ? (
            <Link to="/cart">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                Adicionado ao carrinho
              </button>
            </Link>
          ) : (
            <ItemCount inicial={0} estoque={produto.estoque} onAdd={handleAddToCart} />
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <Link to={`/item/${produto.id}`}>
            <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition w-full">
              Ver Detalhes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
