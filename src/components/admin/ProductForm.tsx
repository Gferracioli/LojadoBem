import React, { useState } from "react";

const ProductForm = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [detalhe1, setDetalhe1] = useState("");
  const [detalhe2, setDetalhe2] = useState("");
  const [price, setPrice] = useState(0);
  const [imagemUrl1, setImagemUrl1] = useState("");
  const [imagemUrl2, setImagemUrl2] = useState("");
  const [imagemUrl3, setImagemUrl3] = useState("");
  const [estoque, setEstoque] = useState(0);
  const [categoria, setCategoria] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      nome,
      descricao,
      detalhe1,
      detalhe2,
      price,
      imagemUrl1,
      imagemUrl2,
      imagemUrl3,
      estoque,
      categoria,
    });
    // Add product handling logic (Firebase)
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-gray-700">Nome do Produto</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Detalhe 1</label>
        <textarea
          value={detalhe1}
          onChange={(e) => setDetalhe1(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Detalhe 2</label>
        <textarea
          value={detalhe2}
          onChange={(e) => setDetalhe2(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Preço</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Imagem URL 1</label>
        <input
          type="text"
          value={imagemUrl1}
          onChange={(e) => setImagemUrl1(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Imagem URL 2</label>
        <input
          type="text"
          value={imagemUrl2}
          onChange={(e) => setImagemUrl2(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Imagem URL 3</label>
        <input
          type="text"
          value={imagemUrl3}
          onChange={(e) => setImagemUrl3(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Estoque</label>
        <input
          type="number"
          value={estoque}
          onChange={(e) => setEstoque(Number(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Categoria</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          <option value={1}>Natureza</option>
          <option value={2}>Comunidade</option>
          <option value={3}>Cuidar</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
