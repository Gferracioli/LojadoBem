import React, { useState } from 'react';
import { CSSProperties } from 'react';

interface Props {
    inicial: number;
    estoque: number;
    onAdd: (quantidade: number) => void;
}

const ItemCount = ({ inicial, estoque, onAdd }: Props) => {
    const [contador, setContador] = useState(inicial);

    const geraAumento = () => {
        if (contador < estoque) {
            setContador(contador + 1);
        }
    };

    const geraDecremento = () => {
        if (contador > 1) {
            setContador(contador - 1);
        }
    };

    return (
        <div style={containerStyle}>
            <button onClick={geraDecremento} style={buttonStyle}>-</button>
            <span style={contadorStyle}>{contador}</span>
            <button onClick={geraAumento} style={buttonStyle}>+</button>
            <button onClick={() => onAdd(contador)} style={addButtonStyle}>Adicionar ao Carrinho</button>
        </div>
    );
};

const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
};

const buttonStyle: CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
};

const contadorStyle: CSSProperties = {
    fontSize: '18px',
};

const addButtonStyle: CSSProperties = {
    marginLeft: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
};

export default ItemCount;