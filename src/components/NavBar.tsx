import React from 'react';
import { Link } from "react-router-dom";
import CartWidget from './CartWidget';
import data from '../data/produtos.json'
import { link } from 'fs';
import { NOMEM } from 'dns';

const NavBar = () => {
    return (
        <nav style={styles.navbar}>
            <div>
            <Link to="/"><img src="/assets/img/logo.png" alt="Logo" className="navbar-logo" /></Link>
            <h1>Loja do Bem</h1>
            </div>

            <div>
                {data.categorias.map((categoria) => (
                    <Link to="/">{categoria.nome}</Link>
                ))}
            </div>
            
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