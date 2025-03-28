import { useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
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

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <span>Inversiones Ramirez </span><span className="logo-highlight">Group</span>
                </div>

                <button className="menu-toggle" aria-label="Menú" onClick={toggleMenu}>
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                </button>

                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item active">
                            <a href="#inicio" className="nav-link" onClick={handleNavLinkClick}>
                                <svg className="nav-icon" viewBox="0 0 24 24">
                                    <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
                                </svg>
                                Inicio
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#servicios" className="nav-link" onClick={handleNavLinkClick}>
                                <svg className="nav-icon" viewBox="0 0 24 24">
                                    <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                Servicios
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#acerca" className="nav-link" onClick={handleNavLinkClick}>
                                <svg className="nav-icon" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                </svg>
                                Acerca
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#testimonios" className="nav-link" onClick={handleNavLinkClick}>
                                <svg className="nav-icon" viewBox="0 0 24 24">
                                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" />
                                </svg>
                                Testimonios
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#contacto" className="nav-link" onClick={handleNavLinkClick}>
                                <svg className="nav-icon" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
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
