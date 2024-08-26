import React from 'react';
import CartWidget from './CartWidget';
import logo from '../assets/logo.png';

const NavBar = () => {
    return (
        <nav style={styles.navbar}>
            <h1>Loja do Bem</h1>
            <ul style={styles.navLinks}>
                <li>Home</li>
                <li>Produtos</li>
                <li>Sobre Nós</li>
                <li>Contato</li>
            </ul>
            <CartWidget />
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        gap: '1rem',
    },
};

export default NavBar;