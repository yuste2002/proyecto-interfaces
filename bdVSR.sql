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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `almacens`
--

LOCK TABLES `almacens` WRITE;
/*!40000 ALTER TABLE `almacens` DISABLE KEYS */;
INSERT INTO `almacens` VALUES (1,'familia','2023-03-23','2023-03-23',1),(4,'escalada','2023-03-27','2023-03-27',4),(6,'tu sabe','2023-03-28','2023-03-28',4),(8,'NuevoAlmacen','2023-04-08','2023-04-08',4),(11,'Familia','2023-04-12','2023-04-12',4),(12,'Lolita','2023-04-12','2023-04-12',6),(13,'Jose Antonio','2023-04-17','2023-04-17',7),(23,'monster','2023-04-17','2023-04-17',4),(25,'choco','2023-04-17','2023-04-17',6),(27,'conchudas','2023-04-17','2023-04-17',6),(29,'Cansao','2023-04-17','2023-04-17',4),(30,'rocioShula','2023-04-17','2023-04-17',4),(36,'AlmacenIker','2023-04-17','2023-04-17',6);
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
  `usuario` varchar(45) DEFAULT NULL,
  `almacen` varchar(45) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitados`
--

LOCK TABLES `invitados` WRITE;
/*!40000 ALTER TABLE `invitados` DISABLE KEYS */;
INSERT INTO `invitados` VALUES (1,'4','1','2022-04-04','2022-05-04'),(2,'1','4','2023-04-04','2023-05-04'),(3,'7','4',NULL,NULL),(8,'2','27','2023-04-17','2023-04-17'),(9,'4','27','2023-04-17','2023-04-17'),(10,'2','29','2023-04-17','2023-04-17'),(11,'2','30','2023-04-17','2023-04-17'),(12,'6','30','2023-04-17','2023-04-17'),(13,'2','36','2023-04-17','2023-04-17');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objetos`
--

LOCK TABLES `objetos` WRITE;
/*!40000 ALTER TABLE `objetos` DISABLE KEYS */;
INSERT INTO `objetos` VALUES (1,'coche','coche de lucas','casa lucas',NULL,NULL,'2023-04-17',1,4,'como te estrelles vera'),(2,'play','play de lucas','casa lucas',NULL,NULL,NULL,1,4,NULL),(3,'xbox','xbox de lucas','casa lucas',NULL,NULL,NULL,1,1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,'2022-02-02','2023-02-02',NULL,NULL,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'lucasR','lucasRamos@gmail.com','lucasViejo','Lucas','Ramirez','2023-03-23','2023-03-23'),(2,'paproka','paproka','p','p','p','2023-03-27','2023-04-17'),(3,'paprokaRealG4life','paproka@papro.cigarro','p','Pa Proka','Caracola','2023-03-27','2023-03-27'),(4,'yuste','yuste@activao.es','yuste','Alvaro','Yuste','2023-03-27','2023-03-28'),(5,'yust','','','','','2023-03-28','2023-03-28'),(6,'ikersito','iker@uma.es','iker','iker','galvez','2023-04-12','2023-04-12'),(7,'pedro','pedro@uma.es','pedrito','pedro','sanchez','2023-04-17','2023-04-17');
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

-- Dump completed on 2023-04-18  1:40:59
