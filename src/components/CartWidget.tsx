import React from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";


const CartWidget = () => {
  return (
    <div className="relative">
      <Link to="/cart">
        <TiShoppingCart className="text-white w-8 h-8" />
      </Link>

      
      <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        7 {/* trocar por uma função que conte os items do carrinho quando estiver pronto */}
      </span>
    </div>
  );
};

export default CartWidget;