import { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../navbar/nabvar';
import Footer from '../footer/footer';
import ContactForm from '../ContactForm/ContactForm';

const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Scroll suave para los enlaces
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }, []);

    // Alternar modo oscuro
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
    };

    // Manejo del formulario de contacto
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const message = e.target.message.value;

        if (name && email && message) {
            alert('Mensaje enviado correctamente.');
            e.target.reset();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    return (
        <>
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

            <section className="hero" id="inicio">
                <div className="container">
                    <h1>Invierte en tu Futuro con Nosotros</h1>
                    <p>Ofrecemos soluciones de inversión personalizadas para alcanzar tus metas financieras.</p>
                    <a href="#servicios" className="btn">Explora Nuestros Servicios</a>
                </div>
            </section>

            <section className="services" id="servicios">
                <div className="container">
                    <h2>Nuestros Servicios de Inversión</h2>
                    <div className="service-cards">
                        <div className="card">
                            <div className="icon">🏠</div>
                            <h3>Inversión en Bienes Raíces</h3>
                            <p>Invierte en propiedades con alto potencial de crecimiento y asegura tu futuro financiero.</p>
                        </div>
                        <div className="card">
                            <div className="icon">📈</div>
                            <h3>Fondos de Inversión</h3>
                            <p>Diversifica tu portafolio con nuestros fondos de inversión diseñados para maximizar tus ganancias.</p>
                        </div>
                        <div className="card">
                            <div className="icon">💼</div>
                            <h3>Asesoría Financiera</h3>
                            <p>Recibe asesoramiento personalizado de expertos para tomar decisiones financieras inteligentes.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about" id="acerca">
                <div className="container about-container">
                    <div className="about-image">
                        <img src="https://via.placeholder.com/800x400" alt="Equipo" />
                    </div>
                    <div className="about-content">
                        <h2>Acerca de Nosotros</h2>
                        <p>
                            Somos un grupo de inversión comprometido con ayudarte a alcanzar tus metas financieras. 
                            Nuestra misión es ofrecer soluciones personalizadas y transparentes para garantizar tu éxito.
                        </p>
                        <p>
                            Con años de experiencia en el mercado, nuestro equipo de expertos trabaja contigo para 
                            diseñar estrategias que se adapten a tus necesidades y objetivos.
                        </p>
                        <a href="#contacto" className="btn">Contáctanos</a>
                    </div>
                </div>
            </section>

            <section className="testimonials" id="testimonios">
                <div className="container">
                    <h2>Lo que dicen nuestros clientes</h2>
                    <div className="testimonial-cards">
                        <div className="testimonial-card">
                            <p>"El servicio fue excelente, superó todas mis expectativas. ¡Altamente recomendado!"</p>
                            <div className="author">
                                <img
                                    src="https://via.placeholder.com/60"
                                    alt="Cliente 1"
                                    className="author-img"
                                />
                                <div className="author-info">
                                    <span className="author-name">Juan Pérez</span>
                                    <span className="author-role">Empresario</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <p>"Gracias a su asesoría, logré alcanzar mis metas financieras en tiempo récord."</p>
                            <div className="author">
                                <img
                                    src="https://via.placeholder.com/60"
                                    alt="Cliente 2"
                                    className="author-img"
                                />
                                <div className="author-info">
                                    <span className="author-name">María López</span>
                                    <span className="author-role">Inversionista</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <p>"Un equipo profesional y dedicado. Definitivamente volveré a trabajar con ellos."</p>
                            <div className="author">
                                <img
                                    src="https://via.placeholder.com/60"
                                    alt="Cliente 3"
                                    className="author-img"
                                />
                                <div className="author-info">
                                    <span className="author-name">Carlos García</span>
                                    <span className="author-role">Freelancer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact" id="contacto">
                <ContactForm />
            </section>

            <Footer />
        </>
    );
};

export default Home;
