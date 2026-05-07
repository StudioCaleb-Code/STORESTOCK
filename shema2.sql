-- 1. Tablas Maestras
CREATE TABLE rol (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE estado (
    id_estado SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
);

-- 2. Tablas de Usuarios (Corregida de datoU a dato_u)
CREATE TABLE dato_u (
    id_dato_u SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellido_pa VARCHAR(100) NOT NULL,
    apellido_ma VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    correo VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255),
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    id_rol INTEGER REFERENCES rol(id_rol),
    id_estado INTEGER REFERENCES estado(id_estado),
    id_dato_u INTEGER REFERENCES dato_u(id_dato_u),
    correo VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    id_estado INTEGER REFERENCES estado(id_estado),
    nombres VARCHAR(150) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Proveedores
CREATE TABLE proveedores (
    id_proveedor SERIAL PRIMARY KEY,
    nombre_empresa VARCHAR(255) NOT NULL,
    contacto_nombre VARCHAR(255),
    telefono VARCHAR(15),
    correo VARCHAR(255),
    direccion TEXT
);

-- 4. Productos y Galería
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    id_categoria INTEGER REFERENCES categoria(id_categoria),
    id_proveedor INTEGER REFERENCES proveedores(id_proveedor),
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio_venta DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    imagen_principal VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE producto_galeria (
    id_galeria SERIAL PRIMARY KEY,
    id_producto INTEGER REFERENCES productos(id_producto) ON DELETE CASCADE,
    url_imagen VARCHAR(255) NOT NULL
);

-- 5. Ventas y Vouchers
CREATE TABLE ventas (
    id_venta SERIAL PRIMARY KEY,
    id_cliente INTEGER REFERENCES clientes(id_cliente),
    id_usuario INTEGER REFERENCES usuario(id_usuario),
    total DECIMAL(10,2) NOT NULL,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vaucher (
    id_vaucher SERIAL PRIMARY KEY,
    id_venta INTEGER REFERENCES ventas(id_venta) ON DELETE CASCADE,
    nombre_archivo_vaucher VARCHAR(255),
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE detalle_venta (
    id_det_venta SERIAL PRIMARY KEY,
    id_venta INTEGER REFERENCES ventas(id_venta) ON DELETE CASCADE,
    id_producto INTEGER REFERENCES productos(id_producto),
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL
);

-- 6. Datos Iniciales
INSERT INTO rol (nombre) VALUES ('Owner'), ('Administrador');
INSERT INTO estado (nombre, descripcion) VALUES 
('Activo', 'Esta en linea'),
('Inactivo', 'Fuera de linea'),
('Bloqueado', 'Lista negra'),
('Revision', 'En proceso de revision');