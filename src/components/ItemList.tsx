import React from "react";
import Item from "./Item";
import { Produto } from "../interfaces/produto.interface";

interface Props {
  items: Produto[];
}

const ItemList = ({ items }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ItemList;
