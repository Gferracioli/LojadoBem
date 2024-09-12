import React, { useEffect, useState } from "react";
import CardProjeto from "../../components/CardProjeto";
import { Produto } from "../../interfaces/produto.interface";
import produtos from "../../data/produtos.json"; // Importa o JSON com os produtos

const PaginaInstitucional: React.FC = () => {
  const [items, setItems] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Simulando o carregamento dos produtos com Promise
  useEffect(() => {
    setLoading(true);

    const getItems = new Promise<Produto[]>((resolve) => {
      setTimeout(() => {
        resolve(produtos.produtos);
      }, 2000);
    });

    getItems.then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Seção de Missão e Como Funciona */}
      <div className="container mx-auto py-12 space-y-8">
        {/* Nossa Missão */}
        <section>
          <h2 className="text-3xl font-bold text-center text-violet-800 mb-6">
            Nossa Missão
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center mx-auto max-w-4xl">
            Na "Loja do Bem", acreditamos que cada pequena ação pode gerar um
            impacto positivo na sociedade. Nosso propósito é facilitar a
            conexão entre pessoas dispostas a contribuir com a comunidade e
            causas que promovam o bem-estar social e ambiental. Oferecemos um
            espaço onde qualquer pessoa pode "comprar" boas ações, financiando
            projetos que ajudam a transformar o mundo ao nosso redor.
          </p>
        </section>

        {/* Como Funciona */}
        <section>
          <h2 className="text-3xl font-bold text-center text-violet-800 mb-6">
            Como Funciona
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center mx-auto max-w-4xl">
            Ao realizar uma "compra" na Loja do Bem, você não está adquirindo um
            produto físico. Em vez disso, está financiando um projeto de impacto
            social ou ambiental. Nossa equipe e parceiros locais se encarregam
            de executar a ação escolhida, garantindo que sua contribuição se
            torne um benefício concreto para a comunidade ou meio ambiente.
          </p>
        </section>
      </div>

      {/* Seção de Cards de Projetos */}
      <div className="bg-white py-12">
        <div className="container mx-auto">
          {/* Título da Página */}
          <h1 className="text-4xl font-bold text-center text-violet-800 mb-8">
            Nossos Projetos
          </h1>

          {/* Seção de Cards */}
          {loading ? (
            <p className="text-center text-lg text-violet-700">Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {items.map((produto) => (
                <CardProjeto key={produto.id} produto={produto} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Seção de Compromisso e Transparência */}
      <div className="container mx-auto py-12 space-y-8">
        {/* Nosso Compromisso */}
        <section>
          <h2 className="text-3xl font-bold text-center text-violet-800 mb-6">
            Nosso Compromisso
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center mx-auto max-w-4xl">
            Na "Loja do Bem", cada projeto é executado com o máximo de
            responsabilidade e comprometimento. Contamos com parceiros locais,
            ONGs e voluntários que nos ajudam a tornar essas ações uma
            realidade. Acreditamos que o impacto positivo só é possível quando
            há união de esforços. Ao "comprar" uma dessas boas ações, você se
            torna parte dessa transformação.
          </p>
        </section>

        {/* Transparência e Resultados */}
        <section>
          <h2 className="text-3xl font-bold text-center text-violet-800 mb-6">
            Transparência e Resultados
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center mx-auto max-w-4xl">
            Valorizamos a transparência em todos os nossos processos. Todos os
            projetos que você apoia recebem um acompanhamento detalhado. Ao
            realizar uma doação, você poderá acessar relatórios e fotos do
            projeto concluído, comprovando o impacto gerado por sua
            contribuição.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PaginaInstitucional;
