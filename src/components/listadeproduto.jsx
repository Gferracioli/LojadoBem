import React, { useEffect } from 'react';

const ListadeProdutos = () => {
  // Array de produtos
  const produtos = [
    { id: '1', name: 'Produto 1', description: 'Descrição do Produto 1', stock: 10 },
    { id: '2', name: 'Produto 2', description: 'Descrição do Produto 2', stock: 5 },
    { id: '3', name: 'Produto 3', description: 'Descrição do Produto 3', stock: 15 },
  ];

  const pegarProdutos = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(produtos);
      }, 3000);
    });
  };

  useEffect(() => {
    pegarProdutos().then((resolvedProducts) => {
      console.log(resolvedProducts);
    });
  }, []);

  return (
    <div>
      <h1>Carregando produtos...</h1>
    </div>
  );
};

export default ListadeProdutos;
