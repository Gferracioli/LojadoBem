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

  return (
    <div className="bg-neutral-100 p-6 rounded-lg container mx-auto">
      <ItemList items={items} /> {/* Passando os itens para o ItemList */}
    </div>
  );
};

export default Home;
