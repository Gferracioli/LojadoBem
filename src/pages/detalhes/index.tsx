import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import produtos from "../../data/produtos.json";
import { useLoading } from "../../context/LoadingContex";
import { useCart } from "../../context/CartContext";
import ItemCount from "../../components/ItemCount";
import { Link } from "react-router-dom";
import { Produto } from "../../interfaces/produto.interface";
import { CustomSwiper } from "../../components/Swiper/CustomSwiper";
import "../../pages/detalhes/detalhes.css";

const DetalhesProduto = () => {
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<Produto | undefined>();
  const { loading, setLoading } = useLoading();
  const { addItem, isInCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const getProduto = new Promise<Produto | undefined>((resolve) => {
      setLoading(true);
      setTimeout(() => {
        const itemEncontrado = produtos.produtos.find(
          (item) => item.id === Number(id)
        );
        resolve(itemEncontrado);
      }, 500);
    });
    // separar em outro usereffect
    getProduto.then((data) => {
      setProduto(data);
      setLoading(false);
      if (data && isInCart(data.id)) {
        setAddedToCart(true);
      }
    });
  }, [id, setLoading]);

  if (!produto)
    return <p className="text-center mt-5">Produto não encontrado</p>;

  const handleAddToCart = (quantity: number) => {
    if (produto) {
      addItem(produto, quantity);
      setAddedToCart(true);
    }
  };
  const imagens = [produto.imagemUrl1, produto.imagemUrl2, produto.imagemUrl3];
  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden">
        <div><CustomSwiper images={imagens} /></div>
        <div className="p-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {produto.nome}
          </h1>
          <p className="text-gray-600 mb-4">{produto.descricao}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">
            R$ {produto.price}
          </p>
          <p className="text-gray-600 mb-4">Estoque: {produto.estoque}</p>

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
              <ItemCount
                inicial={1}
                estoque={produto.estoque}
                onAdd={handleAddToCart}
              />
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4 m-4">
            Mais Informações
          </h2>
          <p className="text-gray-600 mb-4">{produto.detalhe1}</p>
          <p className="text-gray-600 mb-4">{produto.detalhe2}</p>
          <h2 className="text-xl font-bold text-gray-800 mb-4 m-4">
            Lembre-se: Ao adquirir um produto da Loja do Bem, você estará
            contribuindo diretamente para a realização dessas ações e
            transformando a vida de muitas pessoas. Junte-se a nós nessa jornada
            de solidariedade e impacto social!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DetalhesProduto;
