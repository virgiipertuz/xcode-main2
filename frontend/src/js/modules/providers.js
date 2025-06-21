// Módulo de Gestión de Proveedores
const Providers = (function() {
    // Variables privadas
    let providers = [
        {
            id: "1",
            nombre: "Pinturas Industriales S.A.",
            ruc: "20123456789",
            direccion: "Av. Industrial 123, Lima",
            telefono: "01-4567890",
            email: "ventas@pindustriales.com",
            productos: "Pinturas epóxicas, Recubrimientos industriales",
            estado: "activo",
            fechaRegistro: "2024-03-20T10:00:00.000Z"
        },
        {
            id: "2",
            nombre: "Químicos del Sur E.I.R.L.",
            ruc: "20987654321",
            direccion: "Jr. Los Químicos 456, Arequipa",
            telefono: "054-234567",
            email: "contacto@quimisur.com",
            productos: "Solventes, Aditivos especiales",
            estado: "activo",
            fechaRegistro: "2024-03-20T11:00:00.000Z"
        },
        {
            id: "3",
            nombre: "Resinas y Pigmentos del Perú S.A.C.",
            ruc: "20567891234",
            direccion: "Av. Venezuela 789, Callao",
            telefono: "01-7891234",
            email: "ventas@resinasperu.com",
            productos: "Resinas, Pigmentos, Colorantes",
            estado: "activo",
            fechaRegistro: "2024-03-20T12:00:00.000Z"
        },
        {
            id: "4",
            nombre: "Importadora de Insumos Químicos S.A.",
            ruc: "20345678912",
            direccion: "Jr. Pizarro 567, Trujillo",
            telefono: "044-345678",
            email: "importaciones@insumosquimicos.com",
            productos: "Solventes importados, Aditivos especiales",
            estado: "activo",
            fechaRegistro: "2024-03-20T13:00:00.000Z"
        },
        {
            id: "5",
            nombre: "Distribuidora Nacional de Pinturas E.I.R.L.",
            ruc: "20789123456",
            direccion: "Av. Los Pintores 890, Chiclayo",
            telefono: "074-567890",
            email: "ventas@distripinturas.com",
            productos: "Pinturas arquitectónicas, Esmaltes",
            estado: "inactivo",
            fechaRegistro: "2024-03-20T14:00:00.000Z",
            fechaBaja: "2024-03-21T09:00:00.000Z"
        }
    ];

    // Métodos privados
    const validateProvider = (provider) => {
        const requiredFields = ['nombre', 'ruc', 'direccion', 'telefono', 'email'];
        return requiredFields.every(field => provider[field]);
    };

    // API pública
    return {
        addProvider(provider) {
            if (!validateProvider(provider)) {
                throw new Error('Proveedor inválido: faltan campos requeridos');
            }

            const existingProvider = providers.find(p => p.ruc === provider.ruc);
            if (existingProvider) {
                throw new Error('Ya existe un proveedor con ese RUC');
            }

            providers.push({
                ...provider,
                id: Date.now().toString(),
                fechaRegistro: new Date().toISOString(),
                estado: 'activo'
            });

            return true;
        },

        updateProvider(id, updates) {
            const index = providers.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Proveedor no encontrado');
            }

            // Evitar actualizar campos críticos
            const { id: _, fechaRegistro: __, ...validUpdates } = updates;

            providers[index] = {
                ...providers[index],
                ...validUpdates,
                ultimaActualizacion: new Date().toISOString()
            };

            return true;
        },

        getProvider(id) {
            return providers.find(p => p.id === id);
        },

        getAllProviders() {
            return [...providers];
        },

        deleteProvider(id) {
            const index = providers.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Proveedor no encontrado');
            }

            // Soft delete
            providers[index].estado = 'inactivo';
            providers[index].fechaBaja = new Date().toISOString();
            
            return true;
        },

        searchProviders(query) {
            query = query.toLowerCase();
            return providers.filter(provider => 
                provider.nombre.toLowerCase().includes(query) ||
                provider.ruc.includes(query) ||
                provider.email.toLowerCase().includes(query)
            );
        },

        getActiveProviders() {
            return providers.filter(p => p.estado === 'activo');
        }
    };
})(); 