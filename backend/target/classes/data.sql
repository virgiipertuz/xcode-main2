-- Insert test providers
INSERT INTO providers (name, contact_name, email, phone, address)
VALUES 
    ('Tech Supplies Inc.', 'John Doe', 'john@techsupplies.com', '555-0101', '123 Tech Street, Silicon Valley, CA'),
    ('Office Solutions', 'Jane Smith', 'jane@officesolutions.com', '555-0102', '456 Office Ave, New York, NY'),
    ('Global Electronics', 'Mike Johnson', 'mike@globalelectronics.com', '555-0103', '789 Tech Blvd, Austin, TX')
ON DUPLICATE KEY UPDATE name = name;

-- Insert test products
INSERT INTO products (name, description, sku, price, stock_quantity, provider_id)
VALUES 
    ('Laptop Pro X1', 'High-performance business laptop', 'LP-X1-001', 1299.99, 50, 1),
    ('Wireless Mouse', 'Ergonomic wireless mouse', 'WM-001', 29.99, 200, 1),
    ('Office Chair', 'Ergonomic office chair', 'OC-001', 199.99, 30, 2),
    ('4K Monitor', '27-inch 4K display', 'MON-4K-001', 399.99, 25, 3),
    ('Mechanical Keyboard', 'RGB mechanical keyboard', 'KB-MECH-001', 89.99, 100, 1)
ON DUPLICATE KEY UPDATE name = name;


INSERT INTO users (username, password, email, role)
VALUES 
    ('usuario', '$2a$10$QifgN062Jd5daL6bT1W.O.Lx8d5jR6.V2/9z5W6g.J.0u8V.y.c4a', 'usuario@helios.com', 'USER'),
    ('soporte', '$2a$10$bL22L8Xm2h6n5K4g.T.l4.jE9.X3y/A4g/B5h/D6i/E7j/F8k/G9', 'soporte@helios.com', 'SUPPORT')
ON DUPLICATE KEY UPDATE username = username; 