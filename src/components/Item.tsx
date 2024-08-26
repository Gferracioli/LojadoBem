import React, { useState } from 'react';
//perguntar ao professor como usa isso corretamente
import { CSSProperties } from 'react';
import ItemCount from './ItemCount';

interface Props {
    id: number;
    nome: string;
    descricao: string;
    price: number;
    imagemUrl: string;
    estoque: number;
}

const Item = ({ id, nome, descricao, price, imagemUrl,estoque}: Props) => {
    const [addedToCart, setAddedToCart] = useState(false);
    const handleAddToCart = (quandidade: number) => {
          setAddedToCart(true);
    };

    return (
        <div style={cardStyle}>
            <img src={imagemUrl} alt={nome} style={imageStyle} />
            <h3>{nome}</h3>
            <p>{descricao}</p>
            <p>{estoque}</p>
            <p>{`Preço: R$ ${price}`}</p>
            {addedToCart ? (
                <button style={buttonStyle}>Finalizar Compra</button>
            ) : (
                <ItemCount inicial={1} estoque={estoque} onAdd={handleAddToCart} />
            )}
            <button style={buttonStyle}>Ver Detalhes</button>
        </div>
    );
};

//Consultei o Google para aprender a fazer isso, acho que quando a gente importar alguma biblioteca deve ficar mais fácil
const cardStyle: CSSProperties = {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '5px',
    textAlign: 'center' as 'center', // Solução de casting
};

const imageStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'cover' as 'cover', // Solução de casting
};

const buttonStyle: CSSProperties = {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
};

export default Item;
