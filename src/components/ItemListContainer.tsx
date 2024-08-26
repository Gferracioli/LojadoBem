import React, { useEffect, useState } from 'react';
import ItemList from './ItemList';

interface Item {
    id: number;
    nome: string;
    descricao: string;
    price: number;
    imagemUrl: string;
    estoque: number;
}

const ItemListContainer = ({ greeting }: { greeting: string }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockData = [
            { id: 1, nome: 'Produto 1', descricao: 'Descrição do Produto 1', price: 100, imagemUrl: 'https://via.placeholder.com/150', estoque: 5 },
            { id: 2, nome: 'Produto 2', descricao: 'Descrição do Produto 2', price: 200, imagemUrl: 'https://via.placeholder.com/150', estoque: 10 },
            { id: 3, nome: 'Produto 3', descricao: 'Descrição do Produto 3', price: 300, imagemUrl: 'https://via.placeholder.com/150', estoque: 15 },
        ];

        const getItems = new Promise<typeof mockData>((resolve) => {
            setTimeout(() => {
                resolve(mockData);
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