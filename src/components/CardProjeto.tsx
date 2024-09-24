import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firestore configuration

interface CardProjetoProps {
  produtoId: string; // Expecting only the product ID
}

const CardProjeto: React.FC<CardProjetoProps> = ({ produtoId }) => {
  const [produto, setProduto] = useState<any | null>(null); // State to store product data

  // Fetch product data from Firestore using the product ID
  const fetchProduto = async () => {
    try {
      const productRef = doc(db, "Produtos", produtoId); // Reference to the specific product document
      const productSnap = await getDoc(productRef); // Fetch product document

      if (productSnap.exists()) {
        setProduto(productSnap.data()); // Store product data in state
      } else {
        console.error("Produto não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar produto no Firestore:", error);
    }
  };

  // Fetch product data when component mounts
  useEffect(() => {
    fetchProduto();
  }, [produtoId]);

  // Render loading state if the product is still being fetched
  if (!produto) {
    return <div>Carregando produto...</div>;
  }

  return (
    <div className="flex bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 overflow-hidden">
      {/* Imagem do Produto */}
      <div className="w-1/3">
        <img
          src={produto.imagemUrl1}
          alt={produto.nome}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Conteúdo do Card */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        {/* Nome do Produto */}
        <h3 className="text-xl font-bold mb-2">{produto.nome}</h3>

        {/* Link para detalhes */}
        <Link to={`/item/${produtoId}`}>
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">
            Ver Detalhes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardProjeto;
