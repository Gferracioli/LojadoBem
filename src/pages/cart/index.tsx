import React from 'react';

const Cart = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
      {/* Aqui você pode listar os itens adicionados ao carrinho */}
      <p>Seu carrinho está vazio.</p> {/* Ou lista de itens */}
    </div>
  );
};

export default Cart;