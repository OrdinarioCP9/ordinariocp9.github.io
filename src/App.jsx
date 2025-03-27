import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

// script.js

// 1. Menú Responsive
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// 2. Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 3. Carrusel de Testimonios
const testimonialCards = document.querySelectorAll('.testimonial-cards .card');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

function showCard(index) {
  testimonialCards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
}

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialCards.length - 1;
  showCard(currentIndex);
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
  showCard(currentIndex);
});

// Mostrar la primera tarjeta al cargar la página
showCard(currentIndex);

// 4. Formulario de Contacto
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (name && email && message) {
    formMessage.textContent = 'Mensaje enviado correctamente.';
    formMessage.style.color = 'green';
    contactForm.reset();
  } else {
    formMessage.textContent = 'Por favor, completa todos los campos.';
    formMessage.style.color = 'red';
  }
});

// 5. Modo Oscuro
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
});

// Interacciones del Navbar
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const navMobile = document.querySelector('.nav-mobile');

// Efecto al hacer scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Menú móvil
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMobile.classList.toggle('active');
});

// Cerrar menú al hacer clic en enlace
document.querySelectorAll('.nav-mobile .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMobile.classList.remove('active');
  });
});

// Actualizar ítem activo
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    this.closest('.nav-item').classList.add('active');
  });
});

export default App