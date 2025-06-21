// Módulo de Utilidades
const Helpers = (function() {
    return {
        // Formateo de fechas
        formatDate(date) {
            return new Date(date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        // Validación de formularios
        validateForm(formData, rules) {
            const errors = {};
            
            for (const [field, value] of formData.entries()) {
                if (rules[field]) {
                    if (rules[field].required && !value) {
                        errors[field] = `El campo ${field} es requerido`;
                    }
                    if (rules[field].minLength && value.length < rules[field].minLength) {
                        errors[field] = `El campo ${field} debe tener al menos ${rules[field].minLength} caracteres`;
                    }
                    if (rules[field].pattern && !rules[field].pattern.test(value)) {
                        errors[field] = `El campo ${field} no tiene un formato válido`;
                    }
                }
            }
            
            return {
                isValid: Object.keys(errors).length === 0,
                errors
            };
        },

        // Manejo de errores
        handleError(error) {
            const message = error.message || 'Ha ocurrido un error';
            // Por ahora solo mostramos en consola, pero aquí podrías agregar una UI para mostrar mensajes
            console.log(message);
            alert(message);
        },

        // Crear elementos DOM con atributos
        createElement(tag, attributes = {}, children = []) {
            const element = document.createElement(tag);
            
            for (const [key, value] of Object.entries(attributes)) {
                if (key === 'className') {
                    element.className = value;
                } else {
                    element.setAttribute(key, value);
                }
            }
            
            children.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else {
                    element.appendChild(child);
                }
            });
            
            return element;
        },

        // Sanitizar input
        sanitizeInput(text) {
            if (!text) return '';
            return text.toString()
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }
    };
})(); 