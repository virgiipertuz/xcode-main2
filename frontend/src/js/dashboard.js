document.addEventListener('DOMContentLoaded', () => {
    // Manejar el cierre de sesión
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/src/pages/login.html';
    });
}); 