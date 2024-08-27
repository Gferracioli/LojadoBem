import React from 'react';

const Hero: React.FC = () => {
    return (
        <div style={styles.heroContainer}>
            <img src="/assets/img/teste.png" alt="Loja do Bem" style={styles.heroImage} />
            <div style={styles.textContainer}>
                <h1 style={styles.title}>Bem-vindo à Loja do Bem!</h1>
                <p style={styles.subtitle}>
                    Aqui, cada compra faz a diferença. Nossos produtos são cuidadosamente selecionados para promover um estilo de vida sustentável e contribuir para um futuro melhor. Explore nossa seleção e encontre algo que você ame!
                </p>
            </div>
        </div>
    );
};

const styles = {
    heroContainer: {
        position: 'relative',
        textAlign: 'center',
        color: '#fff',
    } as React.CSSProperties,
    heroImage: {
        width: '100%',
        height: 'auto',
    } as React.CSSProperties,
    textContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '8px',
    } as React.CSSProperties,
    title: {
        fontSize: '2.5rem',
        margin: '0',
    } as React.CSSProperties,
    subtitle: {
        fontSize: '1.25rem',
        margin: '10px 0 0',
    } as React.CSSProperties,
};

export default Hero;