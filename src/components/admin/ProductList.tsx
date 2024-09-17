import React, { useState } from 'react';
import ProductForm from './ProductForm'; // Form for adding/editing products

const ProductList = () => {
  const [showForm, setShowForm] = useState(false); // For toggling the form

  const products = [
    {
      id: 1,
      nome: 'Plante uma Árvore',
      descricao: 'Contribua para um futuro mais verde.',
      detalhe1: 'Contribua para um futuro mais verde: Ao adquirir este produto...',
      detalhe2: 'Deixe sua marca positiva no mundo...',
      price: 75,
      imagemUrl1: '/assets/img/plantar.webp',
      imagemUrl2: '/assets/img/plantar_2.jpeg',
      imagemUrl3: '/assets/img/plantar_3.jpeg',
      estoque: 5,
      categoria: 1,
      quantidade: 0
    },
    // Add more sample products here
  ];

  // Handle product deletion (will be connected to Firebase later)
  const deleteProduct = (id: number) => {
    console.log(`Delete product with ID: ${id}`);
  };

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Hide Form' : 'Add New Product'}
      </button>

      {showForm && <ProductForm />}

      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="flex flex-col border p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{product.nome}</h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                  Editar
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => deleteProduct(product.id)}
                >
                  Deletar
                </button>
              </div>
            </div>

            <p className="text-gray-600">{product.descricao}</p>
            <p className="mt-2 text-sm text-gray-500">{product.detalhe1}</p>
            <p className="mt-2 text-sm text-gray-500">{product.detalhe2}</p>

            {/* Images */}
            <div className="flex space-x-4 mt-4">
              <img src={product.imagemUrl1} alt={product.nome} className="w-32 h-32 object-cover" />
              <img src={product.imagemUrl2} alt={product.nome} className="w-32 h-32 object-cover" />
              <img src={product.imagemUrl3} alt={product.nome} className="w-32 h-32 object-cover" />
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm">Price: ${product.price}</p>
              <p className="text-sm">Stock: {product.estoque}</p>
              <p className="text-sm">Category: {product.categoria}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
