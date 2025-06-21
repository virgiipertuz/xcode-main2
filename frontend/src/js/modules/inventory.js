// Módulo de Gestión de Inventario
const Inventory = (function() {
    // Variables privadas
    let products = [
        {
            id: "1",
            codigo: "PE-001",
            nombre: "Pintura Epóxica Industrial",
            descripcion: "Pintura epóxica de alto rendimiento para uso industrial",
            categoria: "Industrial",
            stock: 150,
            unidad: "Galón",
            precio: 89.90,
            proveedor: "1", // Pinturas Industriales S.A.
            estado: "activo",
            fechaRegistro: "2024-03-20T10:00:00.000Z"
        },
        {
            id: "2",
            codigo: "LA-002",
            nombre: "Látex Premium Blanco",
            descripcion: "Pintura látex premium para interiores y exteriores",
            categoria: "Arquitectónico",
            stock: 200,
            unidad: "Galón",
            precio: 45.90,
            proveedor: "1", // Pinturas Industriales S.A.
            estado: "activo",
            fechaRegistro: "2024-03-20T10:00:00.000Z"
        },
        {
            id: "3",
            codigo: "ES-003",
            nombre: "Esmalte Sintético Negro",
            descripcion: "Esmalte sintético de secado rápido para metal",
            categoria: "Industrial",
            stock: 120,
            unidad: "Galón",
            precio: 55.90,
            proveedor: "2", // Químicos del Sur E.I.R.L.
            estado: "activo",
            fechaRegistro: "2024-03-20T11:00:00.000Z"
        },
        {
            id: "4",
            codigo: "RP-004",
            nombre: "Resina Poliéster",
            descripcion: "Resina poliéster transparente para acabados",
            categoria: "Industrial",
            stock: 80,
            unidad: "Kit",
            precio: 120.00,
            proveedor: "3", // Resinas y Pigmentos del Perú S.A.C.
            estado: "activo",
            fechaRegistro: "2024-03-20T12:00:00.000Z"
        },
        {
            id: "5",
            codigo: "PI-005",
            nombre: "Pigmento en Polvo Azul",
            descripcion: "Pigmento en polvo para tintes industriales",
            categoria: "Industrial",
            stock: 50,
            unidad: "Balde",
            precio: 75.50,
            proveedor: "3", // Resinas y Pigmentos del Perú S.A.C.
            estado: "activo",
            fechaRegistro: "2024-03-20T13:00:00.000Z"
        },
        {
            id: "6",
            codigo: "LA-006",
            nombre: "Látex Mate Marfil",
            descripcion: "Pintura látex mate para interiores",
            categoria: "Arquitectónico",
            stock: 0,
            unidad: "Galón",
            precio: 42.90,
            proveedor: "1", // Pinturas Industriales S.A.
            estado: "inactivo",
            fechaRegistro: "2024-03-20T14:00:00.000Z",
            fechaBaja: "2024-03-21T09:00:00.000Z"
        },
        {
            id: "7",
            codigo: "SO-007",
            nombre: "Solvente Industrial",
            descripcion: "Solvente multiuso para pinturas industriales",
            categoria: "Industrial",
            stock: 100,
            unidad: "Galón",
            precio: 35.90,
            proveedor: "4", // Importadora de Insumos Químicos S.A.
            estado: "activo",
            fechaRegistro: "2024-03-20T15:00:00.000Z"
        },
        {
            id: "8",
            codigo: "BA-008",
            nombre: "Base Anticorrosiva Gris",
            descripcion: "Base anticorrosiva para metales",
            categoria: "Industrial",
            stock: 90,
            unidad: "Galón",
            precio: 65.90,
            proveedor: "2", // Químicos del Sur E.I.R.L.
            estado: "activo",
            fechaRegistro: "2024-03-20T16:00:00.000Z"
        }
    ];

    // Métodos privados
    const validateProduct = (product) => {
        const requiredFields = ['codigo', 'nombre', 'categoria', 'stock', 'unidad', 'precio'];
        return requiredFields.every(field => product[field] !== undefined);
    };

    // API pública
    return {
        addProduct(product) {
            if (!validateProduct(product)) {
                throw new Error('Producto inválido: faltan campos requeridos');
            }

            const existingProduct = products.find(p => p.codigo === product.codigo);
            if (existingProduct) {
                throw new Error('Ya existe un producto con ese código');
            }

            products.push({
                ...product,
                id: Date.now().toString(),
                fechaRegistro: new Date().toISOString(),
                estado: 'activo'
            });

            return true;
        },

        updateProduct(id, updates) {
            const index = products.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Producto no encontrado');
            }

            // Evitar actualizar campos críticos
            const { id: _, fechaRegistro: __, ...validUpdates } = updates;

            products[index] = {
                ...products[index],
                ...validUpdates,
                ultimaActualizacion: new Date().toISOString()
            };

            return true;
        },

        getProduct(id) {
            return products.find(p => p.id === id);
        },

        getAllProducts() {
            return [...products];
        },

        deleteProduct(id) {
            const index = products.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Producto no encontrado');
            }

            // Soft delete
            products[index].estado = 'inactivo';
            products[index].fechaBaja = new Date().toISOString();
            
            return true;
        },

        searchProducts(query) {
            query = query.toLowerCase();
            return products.filter(product => 
                product.nombre.toLowerCase().includes(query) ||
                product.codigo.toLowerCase().includes(query) ||
                product.categoria.toLowerCase().includes(query)
            );
        },

        getActiveProducts() {
            return products.filter(p => p.estado === 'activo');
        },

        updateStock(id, quantity) {
            const product = this.getProduct(id);
            if (!product) {
                throw new Error('Producto no encontrado');
            }

            const newStock = product.stock + quantity;
            if (newStock < 0) {
                throw new Error('Stock insuficiente');
            }

            return this.updateProduct(id, { stock: newStock });
        }
    };
})(); 