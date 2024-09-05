import React, { useState } from "react";
//perguntar ao professor como usa isso corretamente
import { CSSProperties } from "react";
import ItemCount from "./ItemCount";
import { Link } from 'react-router-dom';

interface Props {
  id: number;
  nome: string;
  descricao: string;
  price: number;
  imagemUrl: string;
  estoque: number;
}

const Item = ({ id, nome, descricao, price, imagemUrl, estoque }: Props) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const handleAddToCart = (quandidade: number) => {
    setAddedToCart(true);
  };

  return (
    <div style={styles.card}>
      <img src={imagemUrl} alt={nome} style={styles.image} />
      <div style={styles.cardBody}>
        <h3>{nome}</h3>
        <p>{descricao}</p>
        <p>{`Preço: R$ ${price}`}</p>
        <p>{`Quantidade disponível: ${estoque}`}</p>
        {addedToCart ? (
          <button style={styles.button}>Finalizar Compra</button>
        ) : (
          <ItemCount inicial={0} estoque={estoque} onAdd={handleAddToCart} />
        )}
         <Link to={`/item/${id}`}><button style={styles.button}>Ver Detalhes</button> </Link>
      </div>
    </div>
  );
};

//Consultei o Google para aprender a fazer isso, acho que quando a gente importar alguma biblioteca deve ficar mais fácil
const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    maxWidth: "300px",
    margin: "10px",
    backgroundColor: "#F8F7FF",
  } as CSSProperties,
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  } as CSSProperties,
  cardBody: {
    padding: "15px",
  } as CSSProperties,
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "10px",
  } as CSSProperties,
  description: {
    fontSize: "0.9rem",
    color: "#555",
    marginBottom: "15px",
  } as CSSProperties,
  price: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  } as CSSProperties,
  button: {
    padding: "10px 15px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#1DAB45",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  } as CSSProperties,
};
export default Item;
