import React, { useState } from "react";
import ItemCount from "./ItemCount";
import { Link } from "react-router-dom";

interface Props {
  id: number;
  nome: string;
  descricao: string;
  price: number;
  imagemUrl: string;
  estoque: number;
}

const Item = ({ id, nome, descricao, price, imagemUrl, estoque }: Props) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (quantidade: number) => {
    setAddedToCart(true);
  };

  return (
    <div className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 m-4 flex flex-col justify-between">
      <img src={imagemUrl} alt={nome} className="w-full h-48 object-cover" />

      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-xl font-bold mb-2">{nome}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{descricao}</p>
        <p className="text-lg font-semibold text-gray-800 mb-2">{`Preço: R$ ${price}`}</p>
        <p className="text-sm text-gray-600 mb-4">{`Quantidade disponível: ${estoque}`}</p>

        <div className="flex justify-center items-center mt-2 ">
          {addedToCart ? (
            <Link to="/cart">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition ">
              Adicionado ao carrinho
            </button>
            </Link>
          ) : (
            <ItemCount inicial={0} estoque={estoque} onAdd={handleAddToCart} />
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <Link to={`/item/${id}`}>
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
