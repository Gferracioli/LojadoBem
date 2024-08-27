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
        <div>
            <h2>{greeting}</h2>
            {loading ? <p>Carregando produtos...</p> : <ItemList items={items} />}
        </div>
    );
};

export default ItemListContainer;