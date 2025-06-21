// Módulo de Autenticación
const Auth = (function() {
    // Variables privadas
    const storageKey = 'auth_user';
    let currentUser = JSON.parse(localStorage.getItem(storageKey) || 'null');

    // Usuario por defecto para desarrollo
    const defaultUser = {
        id: "1",
        username: "admin",
        nombre: "Administrador",
        email: "admin@helios.com",
        role: "admin"
    };

    // API pública
    return {
        login(username, password) {
            // Para desarrollo, aceptamos cualquier credencial
            currentUser = defaultUser;
            localStorage.setItem(storageKey, JSON.stringify(currentUser));
            return true;
        },

        logout() {
            currentUser = null;
            localStorage.removeItem(storageKey);
            window.location.href = 'login.html';
        },

        getCurrentUser() {
            return currentUser || defaultUser; // Para desarrollo, siempre devolvemos un usuario
        },

        checkAuth() {
            return true; // Para desarrollo, siempre autenticado
        },

        isAdmin() {
            return this.getCurrentUser().role === 'admin';
        }
    };
})(); 