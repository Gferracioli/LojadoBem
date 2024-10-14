import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeItem, updateItemQuantity } = useCart();

  const handleQuantityChange = (itemId: string, adjustment: number) => {
    const item = cart.find((i) => i.id === itemId);
    if (!item) return;

    const newQuantity = item.quantidade + adjustment;

    // Impede quantidade menor que 1
    if (newQuantity < 1) {
      alert("A quantidade não pode ser menor que 1.");
      return;
    }

    // Atualiza a quantidade sem afetar o estoque
    updateItemQuantity(itemId, newQuantity);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.productData.price * item.quantidade, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50">
        <img
          src="/assets/img/hero-image2.png"
          alt="logo"
          className="mb-8 w-1/2 max-w-xs md:max-w-md shadow-lg rounded-lg"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Seu carrinho está vazio</h1>
        <h2 className="text-lg text-gray-600 text-center mb-6 max-w-xl">
          Volte para a página inicial e escolha um dos nossos produtos.
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-lg shadow-md"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Seu Carrinho</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Continuar Comprando
        </button>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-3/4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between border-b py-4"
            >
              <img
                src={item.productData.imagemUrl1}
                alt={item.productData.nome}
                className="w-32 h-32 object-cover mb-4 md:mb-0"
              />

              <div className="flex-1 md:ml-6">
                <h2 className="text-lg font-bold">{item.productData.nome}</h2>
                <p className="text-sm text-gray-600">Preço Unitário: R${item.productData.price.toFixed(2)}</p>

                <div className="flex items-center mt-2 space-x-3">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                    disabled={item.quantidade <= 1}
                  >
                    -
                  </button>
                  <span className="mx-3 text-lg font-semibold text-gray-700">{item.quantidade}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className={`px-3 py-1 rounded transition ${
                      item.quantidade >= item.productData.estoque
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    disabled={item.quantidade >= item.productData.estoque}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">Estoque disponível: {item.productData.estoque}</p>
              </div>

              <div className="md:ml-4 text-right">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  Subtotal: R${(item.productData.price * item.quantidade).toFixed(2)}
                </p>
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

        <div className="lg:w-1/4 bg-gray-100 p-6 rounded-lg mt-8 lg:mt-0">
          <h2 className="text-2xl font-bold mb-4">Resumo do Pedido</h2>
          <div className="mb-2 flex justify-between">
            <span>Total de Itens</span>
            <span>{cart.length}</span>
          </div>
          <div className="mb-2 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>R${calculateTotal().toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
