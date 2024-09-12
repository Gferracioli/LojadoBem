import React, { useState } from "react";
import ItemCount from "./ItemCount";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Produto } from "../interfaces/produto.interface";
import { CustomSwiper } from "./Swiper/CustomSwiper";
import "../components/Swiper/CustomSwiper.css"; // CSS para detalhes
import "../components/Swiper/CardSwiper.css";   // CSS para os cards

const Item = (produto: Produto) => {
  const { addItem, isInCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(isInCart(produto.id)); 

  const handleAddToCart = (quantidade: number) => {
    addItem(produto, quantidade);
    setAddedToCart(true);
  };

  const imagens = [produto.imagemUrl1, produto.imagemUrl2, produto.imagemUrl3];

  return (
    <div className="max-w-sm  bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 m-4 flex flex-col justify-between">
     <Link to={`/item/${produto.id}`}>
       {/* Passamos a prop isCard */}
       <CustomSwiper images={imagens} isCard />
     </Link>
      <div className="flex flex-col flex-grow p-4">
        <Link to={`/item/${produto.id}`}>
          <h3 className="text-xl font-bold mb-2">{produto.nome}</h3>
        </Link>
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
            <button className="px-2 py-1 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition w-full">
              Ver Detalhes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
