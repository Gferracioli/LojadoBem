import React from 'react';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

const App: React.FC = () => {
    return (
        <div>
            <NavBar />
            <ItemListContainer greeting="Bem-vindo à Loja do Bem!" />
        </div>
    );
};

export default App;