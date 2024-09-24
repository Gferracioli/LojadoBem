import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { useLoading } from "../context/LoadingContex";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firestore configuration

const Home = () => {
  const { id } = useParams<{ id: string }>(); // Capture category id from URL
  const { setLoading } = useLoading();
  const [items, setItems] = useState<any[]>([]); // Store the fetched products
  const [error, setError] = useState<string | null>(null); // For error handling

  // Fetch products from Firestore based on the category
  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error before making a new request

    const getItems = async () => {
      try {
        const productCollectionRef = collection(db, "Produtos");
        let productQuery;

        if (id) {
          console.log(`Fetching products with category id: ${id}`); // Debugging log
          productQuery = query(productCollectionRef, where("categoria", "==", id));
        } else {
          console.log("Fetching all products (no category filter)");
          productQuery = productCollectionRef; // Fetch all products if no category is specified
        }

        const productSnapshot = await getDocs(productQuery);

        if (productSnapshot.empty) {
          console.warn(`No products found for category id: ${id}`); // Log if no products found
        }

        const productsList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched products:", productsList); // Debugging log

        setTimeout(() => {
          setItems(productsList);
          setLoading(false);
        }, 2000); // Simulate loading
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Erro ao conectar com a Firestore");
        setLoading(false);
      }
    };

    getItems(); // Trigger the function to fetch items
  }, [id, setLoading]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-neutral-100 p-6 rounded-lg container mx-auto">
      <ItemList items={items} /> {/* Passing the items to ItemList */}
    </div>
  );
};

export default Home;
