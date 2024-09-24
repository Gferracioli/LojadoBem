import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Firestore configuration

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeItem, updateItemQuantity } = useCart();
  const [products, setProducts] = useState<any[]>([]); // No need for Produto interface

  // Fetch product details from Firestore
  const fetchProductDetails = async () => {
    const updatedProducts = await Promise.all(
      cart.map(async (cartItem) => {
        const productRef = doc(db, "Produtos", cartItem.id); // Fetch product document from Firestore
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data();
          return {
            ...cartItem,
            price: productData.price, // Get price from Firestore
            estoque: productData.estoque, // Get stock from Firestore
            imagemUrl1: productData.imagemUrl1, // Get image URL from Firestore
            nome: productData.nome, // Get product name from Firestore
          };
        }
        return cartItem; // In case the product is not found, return the cart item
      })
    );
    setProducts(updatedProducts); // Update products in the state
  };

  // Fetch product details on page load and when the cart changes
  useEffect(() => {
    fetchProductDetails();
  }, [cart]); // Re-fetch when the cart changes

  // Calculate the total price
  const calculateTotal = () => {
    return products.reduce((acc: number, item) => acc + item.price * item.quantidade, 0);
  };

  // Calculate the total quantity
  const getTotalQuantity = () => {
    return products.reduce((total: number, item) => total + item.quantidade, 0);
  };

  // Handle quantity change and check stock availability
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const product = products.find((prod) => prod.id === itemId);
    if (product && product.estoque && newQuantity <= product.estoque) {
      updateItemQuantity(itemId, newQuantity); // Update quantity in the cart
    } else {
      alert("Quantidade máxima atingida para este item");
    }
  };

  // If cart is empty
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
              {/* Display product image */}
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
                    disabled={item.quantidade >= (item.estoque || 0)}
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

        {/* Right: Summary */}
        <div className="lg:w-1/4 bg-gray-100 p-6 rounded-lg mt-8 lg:mt-0">
          <h2 className="text-2xl font-bold mb-4">Resumo</h2>
          <div className="mb-2 flex justify-between">
            <span>Subtotal</span>
            <span>${calculateTotal()}</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span>Frete</span>
            <span>$0.00</span> {/* Placeholder for shipping */}
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
