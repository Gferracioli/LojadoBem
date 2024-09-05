import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../../data/produtos.json'; 

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    price: number;
    imagemUrl: string;
    estoque: number;
    categoria: number;
}

const Detalhes = () => {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState<Produto | undefined>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        setLoading(true);

        const info = new Promise<Produto | undefined>((resolve) => {
            setTimeout(() => {
                resolve(data.produtos.find((product) => product.id === Number(id)));
            }, 500);
        });

        info.then((resp) => {
            setLoading(false);
            setItem(resp);
        });
    }, [id]);

    if (loading) return <p>Carregando...</p>;

    if (!item) return <p>Produto não encontrado</p>;

    return (
        <div className="p-4">
            <img
                src={item.imagemUrl}
                alt={item.nome}
                className="w-full h-64 object-cover rounded"
            />
            <h1 className="text-2xl font-bold mt-4">{item.nome}</h1>
            <p className="text-gray-700 mt-2">{item.descricao}</p>
            <p className="text-gray-700 mt-2">Preço: R$ {item.price}</p>
            <p className="text-gray-700 mt-2">Estoque: {item.estoque}</p>
        </div>
    );
};

export default Detalhes;