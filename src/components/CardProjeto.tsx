import React from 'react';
import { Link } from 'react-router-dom';
import { Produto } from '../interfaces/produto.interface'; // O caminho da interface pode variar no seu projeto

interface CardProjetoProps {
  produto: Produto;
}

const CardProjeto: React.FC<CardProjetoProps> = ({ produto }) => {
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
        <Link to={`/item/${produto.id}`}>
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">
            Ver Detalhes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardProjeto;
