import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para capturar o ID da categoria
import ItemList from "./ItemList";
import produtos from "../data/produtos.json";
import { useLoading } from "../context/LoadingContex";
import { Produto } from "../interfaces/produto.interface"; // Importa a interface Produto

const Home = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, setLoading } = useLoading();
  const [items, setItems] = useState<Produto[]>([]); // Usa a interface Produto

  useEffect(() => {
    setLoading(true);

    const getItems = new Promise<Produto[]>((resolve) => {
      setTimeout(() => {
        const filteredItems = id
          ? produtos.produtos.filter((item) => item.categoria === Number(id))
          : produtos.produtos;
        resolve(filteredItems);
      }, 2000);
    });

    getItems.then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, [id, setLoading]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 p-6 rounded-lg">
      <ItemList items={items} /> {/* Passando os itens para o ItemList */}
    </div>
  );
};

export default Home;
