import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Para capturar o ID da categoria
import ItemList from './ItemList';
import produtos from '../data/produtos.json';
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

const Home = () => {
    const { id } = useParams<{ id: string }>(); 
    const [items, setItems] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getItems = new Promise<Produto[]>((resolve) => {
            setTimeout(() => {
                const filteredItems = id
                    ? produtos.produtos.filter(item => item.categoria === Number(id))
                    : produtos.produtos;
                resolve(filteredItems);
            }, 500);
        });

        getItems.then((data) => {
            setItems(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="w-16 h-16 border-4 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
  </div>;

    return (
        <div style={styles.container}>
            <ItemList items={items} /> {}
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#DCF5E3',
        padding: '20px',
        borderRadius: '8px',
    },
};

export default Home;
