import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
    const [activeLink, setActiveLink] = useState('inicio'); // Estado para el enlace activo

    const handleLinkClick = (link) => {
        setActiveLink(link); // Actualiza el enlace activo
    };

    useEffect(() => {
        // Efecto de scroll
        const handleScroll = () => {
            const header = document.querySelector('.header');
            if (header) {
                if (window.scrollY > 50) { // Reducido el umbral para activación más rápida
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Manejo del menú móvil
    const toggleMenu = () => {
        const nav = document.querySelector('.nav');
        const menuToggle = document.querySelector('.menu-toggle');
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    };

    // Al hacer clic en un elemento del menú en móvil, cerramos el menú
    const handleNavLinkClick = () => {
        const nav = document.querySelector('.nav');
        const menuToggle = document.querySelector('.menu-toggle');
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    };

    const handleScrollToSection = (e, targetId) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Desplazamiento suave
                block: 'start', // Alinea la sección al inicio
            });
        }
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <a href="/" className="logo">
                        <span className="logo-text">Inversiones Ramírez</span>
                        <span className="logo-highlight">Group</span>
                    </a>
                </div>

                <button className="menu-toggle" aria-label="Menú" onClick={toggleMenu}>
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                </button>

                <nav className="nav">
                    <ul className="nav-list">
                        <li
                            className={`nav-item ${activeLink === 'inicio' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('inicio')}
                        >
                            <a href="#inicio" className="nav-link" onClick={(e) => handleScrollToSection(e, '#inicio')}>
                                Inicio
                            </a>
                        </li>
                        <li
                            className={`nav-item ${activeLink === 'servicios' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('servicios')}
                        >
                            <a href="#servicios" className="nav-link" onClick={(e) => handleScrollToSection(e, '#servicios')}>
                                Servicios
                            </a>
                        </li>
                        <li
                            className={`nav-item ${activeLink === 'acerca' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('acerca')}
                        >
                            <a href="#acerca" className="nav-link" onClick={(e) => handleScrollToSection(e, '#acerca')}>
                                Acerca
                            </a>
                        </li>
                        <li
                            className={`nav-item ${activeLink === 'testimonios' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('testimonios')}
                        >
                            <a href="#testimonios" className="nav-link" onClick={(e) => handleScrollToSection(e, '#testimonios')}>
                                Testimonios
                            </a>
                        </li>
                        <li
                            className={`nav-item ${activeLink === 'contacto' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('contacto')}
                        >
                            <a href="#contacto" className="nav-link" onClick={(e) => handleScrollToSection(e, '#contacto')}>
                                Contacto
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="nav-actions">
                    <button className="btn-theme" id="themeToggle" onClick={toggleDarkMode}>
                        <svg className="theme-icon" viewBox="0 0 24 24">
                            <path className="sun" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2v2H2zm18 0h2v2h-2zM11 2v2h2V2zm0 18v2h2v-2zm-8-8h2v2H3z" />
                            <path className="moon" d="M12 3c.46 0 .93.04 1.38.14-1.62.61-2.88 2.18-2.88 4.07 0 2.35 1.73 4.29 4 4.64V13h4v4h-2.36c.35 2.43 2.29 4.36 4.64 4.36 1.89 0 3.46-1.26 4.07-2.88.1.45.14.92.14 1.38 0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
                        </svg>
                        <span className="theme-text">{isDarkMode ? 'Claro' : 'Oscuro'}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
