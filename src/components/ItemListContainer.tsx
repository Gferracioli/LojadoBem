import React, { useEffect, useState } from 'react';
import ItemList from './ItemList';
import produtos from '../data/produtos.json';

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    price: number;
    imagemUrl: string;
    estoque: number;
}

const ItemListContainer = ({ greeting }: { greeting: string }) => {
    const [items, setItems] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getItems = new Promise<Produto[]>((resolve) => {
            setTimeout(() => {
                resolve(produtos);
            }, 2000);
        });

        getItems.then((data) => {
            setItems(data);
            setLoading(false);
        });
    }, []); //para fazer apenas quando carrega a página

    return (
        <div style={styles.container}>
            <h2>{greeting}</h2>
            {loading ? <p>Carregando produtos...</p> : <ItemList items={items} />}
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

export default ItemListContainer;