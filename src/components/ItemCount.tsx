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
        if (contador > 0) {
            setContador(contador - 1);
        }
    };

    return (
        <div style={containerStyle}>
            <button onClick={geraDecremento} style={buttonStyle}>-</button>
            <span style={contadorStyle}>{contador}</span>
            <button onClick={geraAumento} style={buttonStyle}>+</button>
            <button onClick={() => onAdd(contador)} style={addButtonStyle}>🛒</button>
        </div>
    );
};

const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '10px'
};

const buttonStyle: CSSProperties = {
    padding: '5px 10px',
    fontSize: '16px',
    cursor: 'pointer',
};

const contadorStyle: CSSProperties = {
    fontSize: '18px',
};

const addButtonStyle: CSSProperties = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
};

export default ItemCount;