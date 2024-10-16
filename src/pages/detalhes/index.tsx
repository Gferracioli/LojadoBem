import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLoading } from "../../context/LoadingContex";
import { useCart } from "../../context/CartContext";
import ItemCount from "../../components/ItemCount";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Firestore config
import { CustomSwiper } from "../../components/Swiper/CustomSwiper";
import "../../pages/detalhes/detalhes.css"; // CSS correto do Swiper no contexto de detalhes

const DetalhesProduto = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Hook para navegação
  const [produto, setProduto] = useState<any | null>(null); // Dynamic type from Firestore
  const { loading, setLoading } = useLoading();
  const { addItem, isInCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  // Busca dados do produto no Firestore usando o ID
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (!id) {
          console.error("Product ID is undefined");
          return; // Sai cedo se o ID estiver indefinido
        }

        const productRef = doc(db, "Produtos", id as string); // Tipo de afirmação para garantir que `id` é uma string
        const productSnap = await getDoc(productRef); // Busca o documento

        if (productSnap.exists()) {
          setProduto(productSnap.data()); // Seta dados do produto do Firestore
          if (isInCart(id)) {
            setAddedToCart(true); // Verifica se o produto já está no carrinho
          }
        } else {
          console.error("Produto não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, setLoading, isInCart]);

  if (!produto) return <p className="text-center mt-5">Produto não encontrado</p>;

  // Função para adicionar o produto ao carrinho sem alterar o estoque
  const handleAddToCart = (quantity: number) => {
    if (produto) {
      addItem(id as string, produto, quantity); // Adiciona ao carrinho sem alterar estoque
      setAddedToCart(true);
    }
  };

  const imagens = [produto.imagemUrl1, produto.imagemUrl2, produto.imagemUrl3];

  return (
    <div className="container mx-auto p-8">
      {/* Botão de Voltar */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
      >
        Voltar
      </button>

      {/* Nome do Produto no topo */}
      <h1 className="text-4xl font-bold text-center mb-8">{produto.nome}</h1>

      {/* Divisão entre Carrossel e Informações */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Carrossel à esquerda com largura de 75% */}
        <div className="md:w-3/4 w-full">
          <CustomSwiper images={imagens} />
        </div>

        {/* Informações do produto à direita */}
        <div className="md:w-1/4 w-full space-y-6">
          {/* Descrição do Produto */}
          <p className="text-lg text-gray-700">{produto.descricao}</p>

          {/* Preço */}
          <p className="text-2xl font-semibold text-green-600">R$ {produto.price}</p>

          {/* Botões */}
          <div className="flex justify-center items-center mt-2">
            {addedToCart ? (
              <Link to="/cart">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  type="button"
                >
                  Adicionado ao carrinho
                </button>
              </Link>
            ) : (
              <ItemCount inicial={1} estoque={produto.estoque} onAdd={handleAddToCart} />
            )}
          </div>

          {/* Estoque */}
          <p className="text-sm text-gray-600">Estoque disponível: {produto.estoque}</p>
        </div>
      </div>

      {/* Mais informações abaixo da divisão */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mais Informações</h2>
        <p className="text-gray-600 mb-4">{produto.detalhe1}</p>
        <p className="text-gray-600 mb-4">{produto.detalhe2}</p>
      </div>
    </div>
  );
};

export default DetalhesProduto;
