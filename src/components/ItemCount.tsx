import React, { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
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
    <div className="flex items-center gap-4 my-4">
      <button
        onClick={geraDecremento}
        className="px-4 py-2 text-lg font-semibold bg-gray-200 hover:bg-gray-300 rounded"
      >
        -
      </button>

      <span className="text-xl font-semibold">{contador}</span>

      <button
        onClick={geraAumento}
        className="px-4 py-2 text-lg font-semibold bg-gray-200 hover:bg-gray-300 rounded"
      >
        +
      </button>
      <button
        onClick={() => onAdd(contador)}
        disabled={contador === 0}
        className={`px-4 py-2 ml-4 text-lg font-semibold text-white rounded transition relative ${
          contador === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        <TiShoppingCart className="text-white w-6 h-6" />
      </button>
    </div>
  );
};

export default ItemCount;
