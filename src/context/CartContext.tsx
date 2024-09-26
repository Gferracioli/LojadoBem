import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore"; // Inclui updateDoc para atualizações

interface CartContextProps {
  cart: { id: string; productData: any }[];
  addItem: (id: string, productData: any, quantidade: number) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantidade: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  addItem: () => null,
  removeItem: () => null,
  updateItemQuantity: () => null,
  clearCart: () => null,
  isInCart: () => false,
});

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<{ id: string; productData: any }[]>([]);

  // Função para buscar os dados do carrinho no Firestore
  const fetchCartData = async () => {
    const cartCollectionRef = collection(db, "cart");
    const cartSnapshot = await getDocs(cartCollectionRef);
    const cartItems = cartSnapshot.docs.map((doc) => ({
      id: doc.id,
      productData: doc.data(),
    }));
    setCart(cartItems);
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // Adiciona ou atualiza a quantidade de um item no carrinho
  const addItem = async (id: string, productData: any, quantidade: number) => {
    const existingItem = cart.find((cartItem) => cartItem.id === id);

    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, productData: { ...cartItem.productData, quantidade: cartItem.productData.quantidade + quantidade } }
          : cartItem
      );
    } else {
      updatedCart = [...cart, { id, productData: { ...productData, quantidade } }];
    }

    setCart(updatedCart);
    await updateFirestoreCart(updatedCart); // Atualiza no Firestore
  };

  // Remove um item do carrinho
  const removeItem = async (id: string) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== id);
    setCart(updatedCart);
    await updateFirestoreCart(updatedCart); // Atualiza no Firestore
  };

  // Atualiza a quantidade de um item no carrinho
  const updateItemQuantity = async (id: string, quantidade: number) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === id
        ? { ...cartItem, productData: { ...cartItem.productData, quantidade } }
        : cartItem
    );
    setCart(updatedCart);
    await updateFirestoreCart(updatedCart); // Atualiza no Firestore
  };

  // Limpa todo o carrinho
  const clearCart = async () => {
    setCart([]);
    await updateFirestoreCart([]); // Atualiza no Firestore
  };

  // Verifica se um item está no carrinho
  const isInCart = (id: string) => {
    return cart.some((cartItem) => cartItem.id === id);
  };

  // Atualiza o Firestore com o estado atual do carrinho
  const updateFirestoreCart = async (updatedCart: { id: string; productData: any }[]) => {
    await Promise.all(
      updatedCart.map(async (item) => {
        const cartDocRef = doc(db, "cart", item.id);
        await setDoc(cartDocRef, item.productData);
      })
    );
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateItemQuantity, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar o CartContext
export const useCart = () => useContext(CartContext);
