import React from "react";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, removeItem, clearCart, updateItemQuantity } = useCart();

  // Calcular o total da compra
  const calcularTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantidade, 0); // Ajuste de quantidade para o cálculo do total
  };

  // Renderização do carrinho de compras
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>
      {/*Verifica se o carrinho está vazio */}
      {cart.length === 0 ? (
        <p className="text-center">Seu carrinho está vazio.</p>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <h2 className="text-lg font-bold">{item.nome}</h2>
                <p className="text-sm text-gray-600">Preço: R$ {item.price}</p>
                <div className="flex items-center">
                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantidade - 1)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                    disabled={item.quantidade <= 1} // Não permitir que vá abaixo de 1
                  >
                    -
                  </button>
                  <span className="mx-3 text-gray-600">{item.quantidade}</span>
                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantidade + 1)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition" disabled={item.quantidade >= item.estoque}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Quantidade: {item.quantidade}
                </p>{" "}
                {/* Substitui estoque com quantidade correta */}
              </div>
              <div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <h2 className="text-2xl font-bold">Total: R$ {calcularTotal()}</h2>
          </div>
          {/* limpar o carrinho */}
          <div className="mt-4">
            <button
              onClick={clearCart}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Limpar Carrinho
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
