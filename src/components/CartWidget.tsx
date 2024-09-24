import React from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { useCart } from "../context/CartContext"; // Importa o contexto do carrinho

const CartWidget = () => {
  const { cart } = useCart(); // Acessa o estado do carrinho

  // Calcula a quantidade total de itens no carrinho acessando 'productData.quantidade'
  const totalItems = cart.reduce((acc, item) => acc + (item.productData?.quantidade || 0), 0);

  return (
    <div className="relative">
      <Link to="/cart">
        <TiShoppingCart className="text-white w-8 h-8" />
      </Link>

      {totalItems > 0 && (
        <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartWidget;
