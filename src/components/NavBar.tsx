import React from 'react';
import CartWidget from './CartWidget';

const NavBar = () => {
    return (
        <nav style={styles.navbar}>
            <img src="/assets/img/logo.png" alt="Logo" className="navbar-logo" />
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
        backgroundColor: '#068E2C',
        font: 'poppins'

    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        gap: '1rem',
        font: 'poppins'
    },
};

export default NavBar;