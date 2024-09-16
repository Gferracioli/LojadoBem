import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Produto } from "../../interfaces/produto.interface"; // Import the Produto interface

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeItem, updateItemQuantity } = useCart();

  // Calculo do total
  const calculateTotal = () => {
    return cart.reduce((acc: number, item: Produto) => acc + item.price * item.quantidade, 0);
  };

    const handleQuantityChange = (itemId: number, newQuantity: number) => {
    updateItemQuantity(itemId, newQuantity);
  };

  // Carrinho vazio
  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Seu Carrinho está vazio</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">Seu carrinho ({cart.length} items)</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Voltar
        </button>
      </div>

      
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Esquerda: Cart Items */}
        <div className="lg:w-3/4">
          {cart.map((item: Produto) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between border-b py-4"
            >
            
              <img
                src={item.imagemUrl1}
                alt={item.nome}
                className="w-32 h-32 object-cover mb-4 md:mb-0"
              />

              
              <div className="flex-1 md:ml-6">
                <h2 className="text-lg font-bold">{item.nome}</h2>
                <p className="text-sm text-gray-600">Preço: ${item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantidade - 1)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                    disabled={item.quantidade <= 1}
                  >
                    -
                  </button>
                  <span className="mx-3 text-gray-600">{item.quantidade}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantidade + 1)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                    disabled={item.quantidade >= item.estoque} 
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-600">Estoque: {item.estoque}</p>
              </div>

              
              <div className="md:ml-4">
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Direita: Resumo */}
        <div className="lg:w-1/4 bg-gray-100 p-6 rounded-lg mt-8 lg:mt-0">
          <h2 className="text-2xl font-bold mb-4">Resumo</h2>
          <div className="mb-2 flex justify-between">
            <span>Subtotal</span>
            <span>${calculateTotal()}</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span>Frete</span>
            <span>$0.00</span> {/* You can modify this later */}
          </div>
          <div className="mb-2 flex justify-between font-bold">
            <span>Total</span>
            <span>${calculateTotal()}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Finalizar a compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
