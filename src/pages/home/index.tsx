import React from "react";
import NavBar from "../../components/NavBar";
import ItemListContainer from "../../components/ItemListContainer";

const Home: React.FC = () => {
  return (
    <div>
      <NavBar />
      <ItemListContainer greeting="" />
    </div>
  );
};

export default Home;
