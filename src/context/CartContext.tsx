import React, { createContext, useContext, useState } from "react";
import { Produto } from "../interfaces/produto.interface";

// 1. Criar a interface

interface CartContextProps {
  cart: Produto[];
  addItem: (item: Produto, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
}

// 2. Valores default
const CartContext = createContext<CartContextProps>({
  cart: [],
  addItem: () => null,
  removeItem: () => null,
  clearCart: () => null,
  isInCart: () => false,
});

interface CartProviderProps {
  children: React.ReactNode;
}

// 3. Provider que armazena e fornece o estado do carrinho
const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Produto[]>([]);

  // Função para adicionar um item novo ao carrinho
  const addItem = (item: Produto, quantity: number) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Atualiza a quantidade
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantidade: cartItem.quantidade + quantity }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      // Adiciona o item ao carrinho se não existir, abrindo o objeto em array
      setCart([...cart, { ...item, quantidade: quantity }]);
    }
  };

  // Função para remover um item
  const removeItem = (id: number) => {
    setCart(cart.filter((cartItem) => cartItem.id !== id));
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    setCart([]);
  };

  // Função para verificar se o item está no carrinho
  const isInCart = (id: number) => {
    return cart.some(cartItem => cartItem.id === id);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 4. Cria o hook 
const useCart = () => useContext(CartContext);

// 5. Exporta o Hook e o Provider
export { useCart, CartProvider };
