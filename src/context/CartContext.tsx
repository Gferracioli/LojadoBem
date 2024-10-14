import React, { createContext, useContext, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

interface ProductData {
  nome: string;
  price: number;
  estoque: number;
  imagemUrl1: string;
}
interface CartItem {
  id: string;
  quantidade: number;
  productData: ProductData;
}

// Definição das funções e estado que o contexto fornecerá
interface CartContextProps {
  cart: CartItem[];
  addItem: (id: string, productData: ProductData, quantidade: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateItemQuantity: (id: string, quantidade: number) => Promise<void>;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}

// Inicialização do contexto com valores padrões
const CartContext = createContext<CartContextProps>({
  cart: [],
  addItem: async () => {},
  removeItem: async () => {},
  updateItemQuantity: async () => {},
  clearCart: () => {},
  isInCart: () => false,
});

// Provedor do contexto do carrinho
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  /**
   * Função para adicionar um item ao carrinho.
   * Verifica se o item já existe no carrinho e, se sim, apenas atualiza a quantidade.
   * Caso contrário, o item é adicionado ao carrinho.
   */
  const addItem = async (id: string, productData: ProductData, quantidade: number) => {
    const existingItem = cart.find((item) => item.id === id);
    const newQuantity = existingItem ? existingItem.quantidade + quantidade : quantidade;

    // Verifica se a quantidade solicitada excede o estoque disponível
    if (newQuantity > productData.estoque) {
      alert(`Estoque insuficiente! Apenas ${productData.estoque} unidades disponíveis.`);
      return;
    }

    // Atualiza o carrinho com o item adicionado ou a quantidade alterada
    const updatedCart = existingItem
      ? cart.map((item) =>
          item.id === id ? { ...item, quantidade: newQuantity } : item
        )
      : [...cart, { id, quantidade, productData }];

    setCart(updatedCart);
    await updateStockInFirestore(id, productData.estoque - quantidade); // Atualiza o estoque no Firestore
  };

  /**
   * Função para remover um item do carrinho.
   * Remove o item do estado local do carrinho sem modificar o estoque.
   */
  const removeItem = async (id: string) => {
    setCart(cart.filter((item) => item.id !== id)); // Remove o item do carrinho
  };

  /**
   * Função para atualizar a quantidade de um item no carrinho.
   * Verifica se a quantidade desejada é permitida (não excede o estoque).
   */
  const updateItemQuantity = async (id: string, newQuantity: number) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    const adjustment = newQuantity - item.quantidade;

    // Verifica se a quantidade solicitada excede o estoque disponível
    if (adjustment > 0 && newQuantity > item.productData.estoque) {
      alert("Estoque insuficiente para aumentar a quantidade.");
      return;
    }

    // Atualiza a quantidade do item no carrinho
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantidade: newQuantity } : item
    );
    setCart(updatedCart);

    await updateStockInFirestore(id, item.productData.estoque - adjustment); // Atualiza o estoque no Firestore
  };

  /**
   * Função para atualizar o estoque de um produto no Firestore.
   * É chamada após qualquer mudança de quantidade no carrinho.
   */
  const updateStockInFirestore = async (id: string, newStock: number) => {
    try {
      const productRef = doc(db, "Produtos", id);
      await updateDoc(productRef, { estoque: newStock });
    } catch (error) {
      console.error("Erro ao atualizar o estoque no Firestore:", error);
    }
  };

  /**
   * Função para limpar todos os itens do carrinho.
   * Apenas redefine o estado local do carrinho.
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Função para verificar se um item já está presente no carrinho.
   * Retorna um booleano indicando a presença do item.
   */
  const isInCart = (id: string): boolean => {
    return cart.some((item) => item.id === id);
  };

  // Retorna o contexto com todas as funções e o estado do carrinho
  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateItemQuantity, clearCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook para acessar o contexto do carrinho em outros componentes.
 */
export const useCart = () => useContext(CartContext);
