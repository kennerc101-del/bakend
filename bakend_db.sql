-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2026 at 11:50 AM
-- Server version: 10.11.16-MariaDB
-- PHP Version: 8.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bakend_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `cedula` varchar(50) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `edad` int(11) NOT NULL,
  `pagoPorDia` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `empleados`
--

INSERT INTO `empleados` (`id`, `cedula`, `nombre`, `edad`, `pagoPorDia`) VALUES
(1, 'V-12345678', 'Carlos Alberto Pérez', 28, 30.00),
(3, 'V-34567890', 'José Gregorio Hernández', 24, 20.00),
(4, 'V-45678901', 'Valeria Silva', 29, 28.00),
(5, 'V-56789012', 'Gabriel Torres', 35, 35.00);

-- --------------------------------------------------------

--
-- Table structure for table `equipos_tec`
--

CREATE TABLE `equipos_tec` (
  `id` int(11) NOT NULL,
  `idProvedor` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `modelo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipos_tec`
--

INSERT INTO `equipos_tec` (`id`, `idProvedor`, `nombre`, `precio`, `modelo`) VALUES
(3, 2, 'Teclado Mecánico RGB', 49.99, 'Redragon Kumara'),
(4, 2, 'Mouse Inalámbrico', 25.00, 'Logitech M280'),
(5, 3, 'Impresora Multifuncional', 180.00, 'Epson L3210');

-- --------------------------------------------------------

--
-- Table structure for table `provedores`
--

CREATE TABLE `provedores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `lugar` varchar(150) NOT NULL,
  `dueño` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `provedores`
--

INSERT INTO `provedores` (`id`, `nombre`, `lugar`, `dueño`) VALUES
(2, 'Global Computación', 'Trujillo', 'Mariana Rivas'),
(3, 'Importaciones Andinas', 'Caracas', 'Carlos Mendoza'),
(4, 'Soluciones Digitales 24', 'Barquisimeto', 'Ana Sofía Pérez'),
(5, 'Equipos y Redes Express', 'Mérida', 'Luis Altuve');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equipos_tec`
--
ALTER TABLE `equipos_tec`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_equipo_provedor` (`idProvedor`);

--
-- Indexes for table `provedores`
--
ALTER TABLE `provedores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `equipos_tec`
--
ALTER TABLE `equipos_tec`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `provedores`
--
ALTER TABLE `provedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `equipos_tec`
--
ALTER TABLE `equipos_tec`
  ADD CONSTRAINT `fk_equipo_provedor` FOREIGN KEY (`idProvedor`) REFERENCES `provedores` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
