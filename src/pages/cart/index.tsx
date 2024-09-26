import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Firestore configuration

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeItem, updateItemQuantity } = useCart();
  const [products, setProducts] = useState<any[]>([]);

  // Função para buscar os detalhes dos produtos a partir do Firestore
  const fetchProductDetails = async () => {
    const updatedProducts = await Promise.all(
      cart.map(async (cartItem) => {
        const productRef = doc(db, "Produtos", cartItem.id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data();
          return {
            ...cartItem,
            price: productData.price || 0, // Garantir que price seja numérico
            estoque: productData.estoque || 0, // Garantir que estoque seja numérico
            imagemUrl1: productData.imagemUrl1,
            nome: productData.nome,
            quantidade: cartItem.productData.quantidade || 0, // Ajuste: acessando quantidade dentro de productData
          };
        }
        return cartItem; // Retorna o item original caso não encontrado
      })
    );
    setProducts(updatedProducts); // Atualiza os produtos no estado
  };

  useEffect(() => {
    fetchProductDetails();
  }, [cart]);

  // Função para calcular o total (garantir que só valores numéricos sejam somados)
  const calculateTotal = () => {
    return products.reduce((acc: number, item) => {
      const itemTotal = item.price * (item.quantidade || 0); // Certificar que quantidade e preço são válidos
      return acc + itemTotal;
    }, 0);
  };

  // Função para calcular a quantidade total de itens (evitar NaN)
  const getTotalQuantity = () => {
    return products.reduce((total: number, item) => {
      const quantidade = item.quantidade || 0; // Certificar que quantidade seja numérico
      return total + quantidade;
    }, 0);
  };

  // Função para alterar a quantidade e verificar o estoque no Firestore
  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    const product = products.find((prod) => prod.id === itemId);
    if (product && product.estoque && newQuantity <= product.estoque) {
      updateItemQuantity(itemId, newQuantity); // Atualiza a quantidade no carrinho
      await updateStockInFirestore(itemId, newQuantity); // Atualiza o estoque no Firestore
    } else {
      alert("Quantidade máxima atingida para este item");
    }
  };

  // Função para remover o item e atualizar no Firestore
  const handleRemoveItem = async (itemId: string) => {
    removeItem(itemId); // Remove o item do estado local
    await deleteItemFromFirestore(itemId); // Remove o item do Firestore
  };

  // Função para atualizar o estoque no Firestore
  const updateStockInFirestore = async (itemId: string, newQuantity: number) => {
    const productRef = doc(db, "Produtos", itemId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const productData = productSnap.data();
      const updatedStock = productData.estoque - (newQuantity - productData.quantidade); // Calcula o novo estoque

      await updateDoc(productRef, { estoque: updatedStock }); // Atualiza o estoque no Firestore
    }
  };

  // Função para remover o item do Firestore
  const deleteItemFromFirestore = async (itemId: string) => {
    const cartRef = doc(db, "cart", itemId);
    await deleteDoc(cartRef); // Remove o item da coleção 'cart' no Firestore
  };

  // Exibe o carrinho vazio
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
          Volte para a página inicial e escolha um dos nossos produtos, essa é uma grande
          oportunidade de deixar o mundo muito melhor.
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Seu carrinho ({getTotalQuantity()} itens)</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Voltar
        </button>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Left: Cart Items */}
        <div className="lg:w-3/4">
          {products.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between border-b py-4"
            >
              {/* Exibir imagem do produto */}
              <img
                src={item.imagemUrl1}
                alt={item.nome}
                className="w-32 h-32 object-cover mb-4 md:mb-0"
              />

              <div className="flex-1 md:ml-6">
                <h2 className="text-lg font-bold">{item.nome}</h2>
                <p className="text-sm text-gray-600">Preço: ${item.price}</p>

                {/* Controles de quantidade */}
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
                    disabled={item.quantidade >= (item.estoque || 0)}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-600">Estoque: {item.estoque}</p>
              </div>

              <div className="md:ml-4">
                <button
                  onClick={() => handleRemoveItem(item.id)} // Altera para remover o item
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className="lg:w-1/4 bg-gray-100 p-6 rounded-lg mt-8 lg:mt-0">
          <h2 className="text-2xl font-bold mb-4">Resumo</h2>
          <div className="mb-2 flex justify-between">
            <span>Subtotal</span>
            <span>${calculateTotal()}</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span>Frete</span>
            <span>$0.00</span> {/* Placeholder para frete */}
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
