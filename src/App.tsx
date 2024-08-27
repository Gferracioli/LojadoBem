import React from 'react';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import Hero from './components/hero';

const App: React.FC = () => {
    return (
        <div>
            <NavBar />
            
            <ItemListContainer greeting="" />
        </div>
    );
};

export default App;