import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Para capturar o ID da categoria
import ItemList from './ItemList';
import produtos from '../data/produtos.json'; // Importa os produtos do JSON

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
    const { id } = useParams<{ id: string }>(); // Captura o ID da categoria pela URL
    const [items, setItems] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getItems = new Promise<Produto[]>((resolve) => {
            setTimeout(() => {
                // Filtra os produtos pela categoria ou exibe todos
                const filteredItems = id
                    ? produtos.produtos.filter(item => item.categoria === Number(id))
                    : produtos.produtos;
                resolve(filteredItems);
            }, 500); // Simulação de atraso para o carregamento
        });

        getItems.then((data) => {
            setItems(data);
            setLoading(false);
        });
    }, [id]); // O efeito será executado sempre que o ID mudar

    if (loading) return <p>Carregando produtos...</p>;

    return (
        <div style={styles.container}>
            <ItemList items={items} /> {/* Renderiza os produtos filtrados */}
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
