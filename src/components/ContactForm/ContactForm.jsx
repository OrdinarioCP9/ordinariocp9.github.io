import React, { useState } from 'react';
import './contactform.css';

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false,
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Este campo es obligatorio.';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Este campo es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Por favor, ingresa un correo electrónico válido.';
        }
        break;
      case 'phone':
        if (value.trim() && !/^[0-9\s\(\)\+\-]{6,20}$/.test(value)) {
          error = 'Por favor, ingresa un número telefónico válido.';
        }
        break;
      case 'subject':
        if (!value) error = 'Por favor, selecciona un asunto.';
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Este campo es obligatorio.';
        } else if (value.trim().length < 10) {
          error = 'Tu mensaje debe tener al menos 10 caracteres.';
        }
        break;
      case 'privacy':
        if (!value) error = 'Debes aceptar la política de privacidad.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: fieldValue,
    });

    const fieldError = validateField(name, fieldValue);
    setErrors({
      ...errors,
      [name]: fieldError,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setFormStatus({
        loading: true,
        success: false,
        error: false,
      });

      // Simulación de envío (3 segundos)
      setTimeout(() => {
        setFormStatus({
          loading: false,
          success: true,
          error: false,
        });

        // Limpiar formulario
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          privacy: false,
        });

        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          setFormStatus({
            loading: false,
            success: false,
            error: false,
          });
        }, 5000);
      }, 3000);
    }
  };

  return (
    <section className="contact" id="contacto">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Contáctanos</h2>
          <p>
            ¿Tienes alguna pregunta o necesitas más información? Completa el
            formulario y te responderemos a la brevedad.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className={`form-group ${errors.name ? 'error' : ''}`}>
              <input
                type="text"
                id="nombre"
                name="name"
                placeholder=" "
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="nombre">Nombre completo</label>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className={`form-group ${errors.email ? 'error' : ''}`}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Correo electrónico</label>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>
          <div className={`form-group ${errors.phone ? 'error' : ''}`}>
            <input
              type="tel"
              id="telefono"
              name="phone"
              placeholder=" "
              value={formData.phone}
              onChange={handleChange}
            />
            <label htmlFor="telefono">Teléfono (opcional)</label>
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
          <div className={`form-group ${errors.subject ? 'error' : ''}`}>
            <select
              id="asunto"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="" disabled></option>
              <option value="consulta">Consulta general</option>
              <option value="servicio">Información de servicios</option>
              <option value="presupuesto">Solicitud de presupuesto</option>
              <option value="otro">Otro asunto</option>
            </select>
            <label htmlFor="asunto">Asunto</label>
            {errors.subject && <span className="error-message">{errors.subject}</span>}
          </div>
          <div className={`form-group ${errors.message ? 'error' : ''}`}>
            <textarea
              id="mensaje"
              name="message"
              placeholder=" "
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <label htmlFor="mensaje">Tu mensaje</label>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>
          <div className={`checkbox-group ${errors.privacy ? 'error' : ''}`}>
            <input
              type="checkbox"
              id="politica"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
              required
            />
            <label htmlFor="politica">
              He leído y acepto la{' '}
              <a href="#" style={{ color: 'var(--accent)' }}>
                política de privacidad
              </a>
              .
            </label>
            {errors.privacy && <span className="error-message">{errors.privacy}</span>}
          </div>
          {formStatus.success && (
            <div className="form-status success">
              ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
            </div>
          )}
          {formStatus.error && (
            <div className="form-status error">
              Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.
            </div>
          )}
          <div className="form-footer">
            <p className="form-disclaimer">Todos los campos marcados son obligatorios.</p>
            <button type="submit" className="btn-submit" disabled={formStatus.loading}>
              {formStatus.loading ? (
                <>
                  Enviando...
                  <div className="loading-spinner"></div>
                </>
              ) : (
                'Enviar mensaje'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;