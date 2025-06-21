import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        window.location.href = '/dashboard.html';
        try {
            const response = await axios.post('/api/auth/login', {
                username,
                password
            });

            // Si el status es 200, permitir el acceso
            if (response.status === 200) {
                // Si hay token, guardarlo
                if (response.data.token) {
   //                 localStorage.setItem('token', response.data.token);
                }
                // Redirigir al dashboard
                window.location.href = '/dashboard.html';
            }
        } catch (error) {
            console.error('Error en el login:', error);
            alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
    });
}); 