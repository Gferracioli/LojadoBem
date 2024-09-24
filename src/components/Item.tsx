import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";
import { CustomSwiper } from "./Swiper/CustomSwiper";
import "../components/Swiper/CustomSwiper.css"; // CSS para detalhes
import "../components/Swiper/CardSwiper.css";   // CSS para os cards

const Item = ({ id }: { id: string }) => {
  const { addItem, isInCart } = useCart();
  const [productData, setProductData] = useState<any>(null); // We no longer use the Produto interface
  const [addedToCart, setAddedToCart] = useState(false);

  // Fetch product data from Firestore
  useEffect(() => {
    const fetchProductData = async () => {
      const productRef = doc(db, "Produtos", id); // Using Firestore document ID
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        setProductData(productSnap.data()); // Get the entire product data from Firestore
        setAddedToCart(isInCart(id)); // Check if it's in the cart
      } else {
        console.error("Produto não encontrado.");
      }
    };

    fetchProductData();
  }, [id, isInCart]);

  if (!productData) {
    return <div>Carregando informações do produto...</div>;
  }

  const handleAddToCart = (quantidade: number) => {
    addItem(id, productData, quantidade); // Pass the document ID and product data
    setAddedToCart(true);
  };

  const imagens = [productData.imagemUrl1, productData.imagemUrl2, productData.imagemUrl3];

  return (
    <div className="w-full sm:max-w-sm bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 mx-auto m-4 flex flex-col justify-between">
      <Link to={`/item/${id}`}>
        <CustomSwiper images={imagens} isCard />
      </Link>
      <div className="flex flex-col flex-grow p-4">
        <Link to={`/item/${id}`}>
          <h3 className="text-xl font-bold mb-2">{productData.nome}</h3>
        </Link>
        <p className="text-gray-600 mb-4 flex-grow">{productData.descricao}</p>
        <p className="text-lg font-semibold text-gray-800 mb-2">{`Preço: R$ ${productData.price}`}</p>
        <p className="text-sm text-gray-600 mb-4">{`Quantidade disponível: ${productData.estoque}`}</p>

        <div className="flex justify-center items-center mt-2 ">
          {addedToCart ? (
            <Link to="/cart">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                Adicionado ao carrinho
              </button>
            </Link>
          ) : (
            <ItemCount inicial={0} estoque={productData.estoque} onAdd={handleAddToCart} />
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <Link to={`/item/${id}`}>
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
