import React from "react";
import Item from "./Item";

// Define the props interface for ItemList
interface ItemListProps {
  items: any[]; // Expect an array of items passed as a prop
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  // Simply map over the received items and render the Item component
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Item key={item.id} id={item.id} />
      ))}
    </div>
  );
};

export default ItemList;
