-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-05-2026 a las 06:26:43
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12
CREATE DATABASE storestock;

USE storestock;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;

--
-- Base de datos: `storestock`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
    `id_categoria` int(11) NOT NULL,
    `nombre` varchar(100) NOT NULL,
    `descripcion` varchar(255) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
    `id_cliente` int(11) NOT NULL,
    `id_estado` int(11) DEFAULT NULL,
    `nombres` varchar(150) NOT NULL,
    `apellidos` varchar(150) NOT NULL,
    `telefono` varchar(15) NOT NULL,
    `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dato_u`
--

CREATE TABLE `dato_u` (
    `id_dato_u` int(11) NOT NULL,
    `nombres` varchar(100) NOT NULL,
    `apellido_pa` varchar(100) NOT NULL,
    `apellido_ma` varchar(100) NOT NULL,
    `telefono` varchar(15) DEFAULT NULL,
    `correo` varchar(255) NOT NULL,
    `ubicacion` varchar(255) DEFAULT NULL,
    `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dato_u`
--

INSERT INTO
    `dato_u` (
        `id_dato_u`,
        `nombres`,
        `apellido_pa`,
        `apellido_ma`,
        `telefono`,
        `correo`,
        `ubicacion`,
        `fecha_actualizacion`
    )
VALUES (
        1,
        'TONY CALEB',
        'HUAMAN',
        'BORDA',
        '951648614',
        'caleb@dev.com',
        'Plaza de Armas de Satipo',
        '2026-05-06 17:28:05'
    ),
    (
        2,
        'TONY CALEB',
        'HUAMAN',
        'BORDA',
        '951648614',
        'TONY@dev.com',
        'Plaza de Armas de Satipo',
        '2026-05-06 17:29:18'
    ),
    (
        3,
        'TONY CALEB',
        'HUAMAN',
        'BORDA',
        '951648614',
        'caleb@dev.com',
        'Plaza de Armas de Satipo',
        '2026-05-07 02:19:22'
    );

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
    `id_det_venta` int(11) NOT NULL,
    `id_venta` int(11) DEFAULT NULL,
    `id_producto` int(11) DEFAULT NULL,
    `cantidad` int(11) NOT NULL,
    `precio_unitario` decimal(10, 2) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
    `id_estado` int(11) NOT NULL,
    `nombre` varchar(100) NOT NULL,
    `descripcion` varchar(255) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO
    `estado` (
        `id_estado`,
        `nombre`,
        `descripcion`
    )
VALUES (1, 'Activo', 'Esta en linea'),
    (
        2,
        'Inactivo',
        'Fuera de linea'
    ),
    (3, 'Bloqueado', 'Lista negra'),
    (
        4,
        'Revision',
        'En proceso de revision'
    );

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
    `id_producto` int(11) NOT NULL,
    `id_categoria` int(11) DEFAULT NULL,
    `id_proveedor` int(11) DEFAULT NULL,
    `nombre` varchar(255) NOT NULL,
    `descripcion` text DEFAULT NULL,
    `precio_venta` decimal(10, 2) NOT NULL,
    `stock` int(11) NOT NULL DEFAULT 0,
    `imagen_principal` varchar(255) DEFAULT NULL,
    `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_galeria`
--

CREATE TABLE `producto_galeria` (
    `id_galeria` int(11) NOT NULL,
    `id_producto` int(11) DEFAULT NULL,
    `url_imagen` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
    `id_proveedor` int(11) NOT NULL,
    `nombre_empresa` varchar(255) NOT NULL,
    `contacto_nombre` varchar(255) DEFAULT NULL,
    `telefono` varchar(15) DEFAULT NULL,
    `correo` varchar(255) DEFAULT NULL,
    `direccion` text DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
    `id_rol` int(11) NOT NULL,
    `nombre` varchar(50) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO
    `rol` (`id_rol`, `nombre`)
VALUES (1, 'Owner'),
    (2, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
    `id_usuario` int(11) NOT NULL,
    `id_rol` int(11) DEFAULT NULL,
    `id_estado` int(11) DEFAULT NULL,
    `id_dato_u` int(11) DEFAULT NULL,
    `correo` varchar(255) NOT NULL,
    `username` varchar(100) NOT NULL,
    `password` varchar(255) NOT NULL,
    `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO
    `usuario` (
        `id_usuario`,
        `id_rol`,
        `id_estado`,
        `id_dato_u`,
        `correo`,
        `username`,
        `password`,
        `fecha_creacion`
    )
VALUES (
        3,
        1,
        1,
        3,
        'caleb@dev.com',
        'CALEB',
        '$2b$10$rwPszw5O4Tzy81E9lrGd5.VmYZ/br352VSAhW0d88SpZvOzxvvGfW',
        '2026-05-07 02:19:22'
    );

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vaucher`
--

CREATE TABLE `vaucher` (
    `id_vaucher` int(11) NOT NULL,
    `id_venta` int(11) DEFAULT NULL,
    `nombre_archivo_vaucher` varchar(255) DEFAULT NULL,
    `fecha_subida` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
    `id_venta` int(11) NOT NULL,
    `id_cliente` int(11) DEFAULT NULL,
    `id_usuario` int(11) DEFAULT NULL,
    `total` decimal(10, 2) NOT NULL,
    `fecha_venta` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria` ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
ADD PRIMARY KEY (`id_cliente`),
ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `dato_u`
--
ALTER TABLE `dato_u` ADD PRIMARY KEY (`id_dato_u`);

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
ADD PRIMARY KEY (`id_det_venta`),
ADD KEY `id_venta` (`id_venta`),
ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado` ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
ADD PRIMARY KEY (`id_producto`),
ADD KEY `id_categoria` (`id_categoria`),
ADD KEY `id_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `producto_galeria`
--
ALTER TABLE `producto_galeria`
ADD PRIMARY KEY (`id_galeria`),
ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores` ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol` ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
ADD PRIMARY KEY (`id_usuario`),
ADD UNIQUE KEY `correo` (`correo`),
ADD UNIQUE KEY `username` (`username`),
ADD KEY `id_rol` (`id_rol`),
ADD KEY `id_estado` (`id_estado`),
ADD KEY `id_dato_u` (`id_dato_u`);

--
-- Indices de la tabla `vaucher`
--
ALTER TABLE `vaucher`
ADD PRIMARY KEY (`id_vaucher`),
ADD KEY `id_venta` (`id_venta`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
ADD PRIMARY KEY (`id_venta`),
ADD KEY `id_cliente` (`id_cliente`),
ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `dato_u`
--
ALTER TABLE `dato_u`
MODIFY `id_dato_u` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
MODIFY `id_det_venta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto_galeria`
--
ALTER TABLE `producto_galeria`
MODIFY `id_galeria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT de la tabla `vaucher`
--
ALTER TABLE `vaucher`
MODIFY `id_vaucher` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`);

--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
ADD CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`) ON DELETE CASCADE,
ADD CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id_proveedor`);

--
-- Filtros para la tabla `producto_galeria`
--
ALTER TABLE `producto_galeria`
ADD CONSTRAINT `producto_galeria_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`),
ADD CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`id_dato_u`) REFERENCES `dato_u` (`id_dato_u`);

--
-- Filtros para la tabla `vaucher`
--
ALTER TABLE `vaucher`
ADD CONSTRAINT `vaucher_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`) ON DELETE CASCADE;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;