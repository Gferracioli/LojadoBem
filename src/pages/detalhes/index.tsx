import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import produtos from "../../data/produtos.json";
interface Produto {
  id: number;
  nome: string;
  descricao: string;
  detalhe1: string;
  detalhe2: string;
  price: number;
  imagemUrl: string;
  estoque: number;
  categoria: number;
}

const DetalhesProduto = () => {
  const { id } = useParams<{ id: string }>(); // Captura o ID do item pela URL
  const [produto, setProduto] = useState<Produto | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduto = new Promise<Produto | undefined>((resolve) => {
      setTimeout(() => {
        const itemEncontrado = produtos.produtos.find(
          (item) => item.id === Number(id)
        );
        resolve(itemEncontrado);
      }, 500); // Simulação de carregamento
    });

    getProduto.then((data) => {
      setProduto(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-center mt-5">Carregando produto...</p>;

  if (!produto)
    return <p className="text-center mt-5">Produto não encontrado</p>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden">
        {/* Centralizando e limitando a largura da imagem */}
        <img
          src={produto.imagemUrl}
          alt={produto.nome}
          className="w-full max-w-md h-auto object-cover mx-auto mb-6"
        />
        <div className="p-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {produto.nome}
          </h1>
          <p className="text-gray-600 mb-4">{produto.descricao}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">
            R$ {produto.price}
          </p>
          <p className="text-gray-600 mb-4">Estoque: {produto.estoque}</p>
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
            Adicionar ao carrinho
          </button>
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
