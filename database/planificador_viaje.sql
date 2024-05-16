-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-05-2024 a las 07:24:01
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `planificador_viaje`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name_city` varchar(100) NOT NULL,
  `active` varchar(1) NOT NULL,
  `countries_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`id`, `name_city`, `active`, `countries_id`) VALUES
(1, 'Cambridge', '1', 1),
(2, 'London', '1', 1),
(3, 'Tokyo', '1', 2),
(4, 'Osaka', '1', 2),
(5, 'Bombay', '1', 3),
(6, 'Agra', '1', 3),
(7, 'Copenhague', '1', 4),
(8, 'Svendborg', '1', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name_country` varchar(100) NOT NULL,
  `symbol_currency` varchar(10) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `active` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`id`, `name_country`, `symbol_currency`, `currency`, `active`) VALUES
(1, 'Inglaterra', '£', 'GBP', '1'),
(2, 'Japón', '¥', 'JPY', '1'),
(3, 'India', '₹', 'INR', '1'),
(4, 'Dinamarca', 'kr', 'DKK', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `name_country` varchar(100) DEFAULT NULL,
  `name_city` varchar(100) DEFAULT NULL,
  `name_customer` varchar(100) DEFAULT NULL,
  `budget` varchar(100) DEFAULT NULL,
  `weather` varchar(10) DEFAULT NULL,
  `local_currency` varchar(20) DEFAULT NULL,
  `symbol_currency` varchar(2) DEFAULT NULL,
  `budget_local` varchar(100) DEFAULT NULL,
  `exchange_rate` varchar(50) DEFAULT NULL,
  `date_info` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `history`
--

INSERT INTO `history` (`id`, `name_country`, `name_city`, `name_customer`, `budget`, `weather`, `local_currency`, `symbol_currency`, `budget_local`, `exchange_rate`, `date_info`) VALUES
(1, 'Inglaterra', 'London', 'Eliecer', '1500000', '11.1', 'GBP', '£', '309.11640538671', '4852.5409', '2024-05-16 04:51:48'),
(2, 'Japón', 'Tokyo', 'Eliecer', '12000000', '25', 'JPY', '¥', '482792.47165606', '24.8554', '2024-05-16 05:11:14');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `countries_id` (`countries_id`);

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`countries_id`) REFERENCES `countries` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
