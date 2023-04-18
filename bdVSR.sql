-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vsr
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `almacens`
--

DROP TABLE IF EXISTS `almacens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `almacens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `propietario` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `almacens`
--

LOCK TABLES `almacens` WRITE;
/*!40000 ALTER TABLE `almacens` DISABLE KEYS */;
INSERT INTO `almacens` VALUES (1,'padel',NULL,NULL,2),(2,'consolas',NULL,NULL,4),(3,'peliculas',NULL,'2023-04-18',1),(4,'ropa',NULL,NULL,3);
/*!40000 ALTER TABLE `almacens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitados`
--

DROP TABLE IF EXISTS `invitados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invitados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` int DEFAULT NULL,
  `almacen` int DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitados`
--

LOCK TABLES `invitados` WRITE;
/*!40000 ALTER TABLE `invitados` DISABLE KEYS */;
INSERT INTO `invitados` VALUES (1,1,1,NULL,NULL),(2,3,1,NULL,NULL),(3,2,2,NULL,NULL),(4,1,2,NULL,NULL),(5,3,2,NULL,NULL),(6,4,3,NULL,NULL),(7,2,4,NULL,NULL);
/*!40000 ALTER TABLE `invitados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objetos`
--

DROP TABLE IF EXISTS `objetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objetos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `ubicacion` varchar(45) DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `almacenAsociado` int NOT NULL,
  `propietario` int DEFAULT NULL,
  `condiciones` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objetos`
--

LOCK TABLES `objetos` WRITE;
/*!40000 ALTER TABLE `objetos` DISABLE KEYS */;
INSERT INTO `objetos` VALUES (12,'fight club','Pelicula fight club','casa de yuste','','2023-04-18','2023-04-18',3,1,'No usarlo mas de 1 seman');
/*!40000 ALTER TABLE `objetos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `usuarioReserva` int NOT NULL,
  `objetoReserva` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,'2022-02-02','2023-02-02',NULL,NULL,1,1),(2,'2023-04-03','2023-04-05','2023-04-18','2023-04-18',4,12),(4,'2023-04-06','2023-04-08','2023-04-18','2023-04-18',4,12),(29,'2023-04-19','2023-04-22','2023-04-18','2023-04-18',1,12),(30,'2023-04-26','2023-04-29','2023-04-18','2023-04-18',1,17),(31,'2023-04-25','2023-04-28','2023-04-18','2023-04-18',1,12),(32,'2023-04-28','2023-04-30','2023-04-18','2023-04-18',1,12);
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `contrasena` varchar(45) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idUsuario_UNIQUE` (`id`),
  UNIQUE KEY `nombreUsuario_UNIQUE` (`nombreUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'yuste','yuste@uma.es','yuste','alvaro','yuste moreno',NULL,'2023-04-18'),(2,'iker','iker@uma.es','iker','iker','galvez castillo',NULL,NULL),(3,'rocio','rocio@uma.es','rocio','rocio','gomez mancebo',NULL,NULL),(4,'paproka','paproka@uma.es','paproka','pablo','alarcon carrion',NULL,'2023-04-18');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-18 23:06:10
