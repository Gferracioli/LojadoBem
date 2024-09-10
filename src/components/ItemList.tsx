import React from "react";
import Item from "./Item";
import { Produto } from "../interfaces/produto.interface";

interface Props {
  items: Produto[];
}

const ItemList = ({ items }: Props) => {
  return (
    <div style={styles.grid}>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "0.5rem",
  },
};

export default ItemList;
