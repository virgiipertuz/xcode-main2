import axios from 'axios';

// Configuración global de axios
axios.defaults.baseURL = '/api';

// Función para inicializar la aplicación
async function initApp() {
    try {
        // Aquí puedes agregar la lógica de inicialización
        console.log('Aplicación iniciada');
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp); 