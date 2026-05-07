-- 1. Tablas Maestras (Sin dependencias)
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

-- 2. Tablas de Usuarios y Clientes
CREATE TABLE datoU (
    id_datoU SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidoPa VARCHAR(100) NOT NULL,
    apellidoMa VARCHAR(100) NOT NULL,
    telefono VARCHAR(15), -- Mejor VARCHAR para evitar problemas con el 0 inicial
    correo VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255),
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    id_rol INTEGER REFERENCES rol(id_rol),
    id_estado INTEGER REFERENCES estado(id_estado),
    id_datoU INTEGER REFERENCES datoU(id_datoU),
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

-- 3. Tabla de Proveedores
CREATE TABLE proveedores (
    id_proveedor SERIAL PRIMARY KEY,
    nombre_empresa VARCHAR(255) NOT NULL,
    contacto_nombre VARCHAR(255),
    telefono VARCHAR(15),
    correo VARCHAR(255),
    direccion TEXT
);

-- 4. Tablas de Productos e Imágenes
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    id_categoria INTEGER REFERENCES categoria(id_categoria),
    id_proveedor INTEGER REFERENCES proveedores(id_proveedor),
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio_venta DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    imagen_principal VARCHAR(255), -- Foto destacada
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE producto_galeria (
    id_galeria SERIAL PRIMARY KEY,
    id_producto INTEGER REFERENCES productos(id_producto) ON DELETE CASCADE,
    url_imagen VARCHAR(255) NOT NULL -- Para ver más a detalle el producto
);

-- 5. Ventas y Vouchers (Muchos vouchers por cliente)
CREATE TABLE ventas (
    id_venta SERIAL PRIMARY KEY,
    id_cliente INTEGER REFERENCES clientes(id_cliente),
    id_usuario INTEGER REFERENCES usuario(id_usuario), -- El vendedor que atendió
    total DECIMAL(10,2) NOT NULL,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vaucher (
    id_vaucher SERIAL PRIMARY KEY,
    id_venta INTEGER REFERENCES ventas(id_venta) ON DELETE CASCADE,
    nombre_archivo_vaucher VARCHAR(255), -- Solo el nombre/ruta del archivo
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE detalle_venta (
    id_detVenta SERIAL PRIMARY KEY,
    id_venta INTEGER REFERENCES ventas(id_venta) ON DELETE CASCADE,
    id_producto INTEGER REFERENCES productos(id_producto),
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL -- Importante para reportes históricos
);

-- 6. Inserts Iniciales
INSERT INTO rol (nombre) VALUES ('Owner'), ('Administrador');
INSERT INTO estado (nombre, descripcion) VALUES 
('Activo', 'Esta en linea'),
('Inactivo', 'Fuera de linea'),
('Bloqueado', 'Lista negra por motivos (X)'),
('Revision', 'Revisando cliente por motivos (X)');