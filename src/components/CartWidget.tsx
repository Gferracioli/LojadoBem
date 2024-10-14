import React from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { useCart } from "../context/CartContext";

const CartWidget = () => {
  const { cart } = useCart();

  // Calcula a quantidade total de itens no carrinho
  const totalItems = cart.reduce((acc, item) => acc + (item.quantidade || 0), 0);

  return (
    <div className="relative">
      <Link to="/cart" className="relative group">
        <TiShoppingCart className="text-white w-8 h-8 group-hover:text-yellow-300 transition" />
        {totalItems > 0 && (
          <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
        <span className="absolute top-10 left-0 w-max px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Ver carrinho
        </span>
      </Link>
    </div>
  );
};

export default CartWidget;
