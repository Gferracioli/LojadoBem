import React from 'react';
import { Link } from 'react-router-dom';
import { Produto } from '../interfaces/produto.interface'; // O caminho da interface pode variar no seu projeto

interface CardProjetoProps {
  produto: Produto;
}

const CardProjeto: React.FC<CardProjetoProps> = ({ produto }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Imagem do Produto */}
      <img src={produto.imagemUrl1} alt={produto.nome} className="w-full h-48 object-cover" />
      
      {/* Conteúdo do Card */}
      <div className="p-4">
        {/* Nome do Produto */}
        <h3 className="text-xl font-bold mb-2">{produto.nome}</h3>
        
        {/* Descrição Curta */}
        <p className="text-gray-700 mb-4">{produto.descricao}</p>
        
        {/* Link para detalhes */}
        <Link to={`/item/${produto.id}`}>
            <button className="px-2 py-1 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition w-full">
              Ver Detalhes
            </button>
          </Link>
      </div>
    </div>
  );
};

export default CardProjeto;
