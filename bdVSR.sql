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
  `foto` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `almacens`
--

LOCK TABLES `almacens` WRITE;
/*!40000 ALTER TABLE `almacens` DISABLE KEYS */;
INSERT INTO `almacens` VALUES (2,'consolas',NULL,NULL,4,'https://erikstore.com/blog/wp-content/uploads/2022/12/Playstation-origen-y-evolucion-1080x675.jpg'),(4,'ropa',NULL,NULL,3,'https://s2.ppllstatics.com/leonoticias/www/multimedia/202012/12/media/cortadas/SABADO%20ropa%20versioN%20web-kMJF-U1201029297001KwD-1968x1216@RC.jpg'),(38,'Peliculas','2023-04-18','2023-04-18',1,'https://humanidades.com/wp-content/uploads/2019/02/cine-5-e1585960007845.jpg'),(86,'Libros','2023-05-02','2023-05-02',1,'https://img.freepik.com/vector-gratis/ilustracion-pila-libros-diseno-plano-dibujado-mano_23-2149341898.jpg?w=2000'),(87,'Padel','2023-05-02','2023-05-02',2,'https://img.freepik.com/foto-gratis/arreglo-raquetas-pelotas-tenis_23-2149434236.jpg'),(88,'Material de la Uni','2023-05-02','2023-05-02',3,'https://www.fundacionaquae.org/wp-content/uploads/2020/03/Estudiar-en-casa-DAVID-CALLE.jpg'),(89,'Fútbol','2023-05-02','2023-05-02',18,'https://static.abc.es/media/bienestar/2019/09/17/futbol-1-kU3C--1200x630@abc.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitados`
--

LOCK TABLES `invitados` WRITE;
/*!40000 ALTER TABLE `invitados` DISABLE KEYS */;
INSERT INTO `invitados` VALUES (32,4,38,'2023-05-02','2023-05-02'),(33,2,38,'2023-05-02','2023-05-02'),(34,3,38,'2023-05-02','2023-05-02'),(35,4,86,'2023-05-02','2023-05-02'),(36,3,86,'2023-05-02','2023-05-02'),(37,3,87,'2023-05-02','2023-05-02'),(38,4,87,'2023-05-02','2023-05-02'),(39,1,2,'2023-05-02','2023-05-02'),(40,3,2,'2023-05-02','2023-05-02'),(41,2,4,'2023-05-02','2023-05-02'),(42,4,4,'2023-05-02','2023-05-02'),(43,1,4,'2023-05-02','2023-05-02'),(44,2,88,'2023-05-02','2023-05-02'),(45,4,88,'2023-05-02','2023-05-02');
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
  `foto` varchar(500) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `almacenAsociado` int NOT NULL,
  `propietario` int DEFAULT NULL,
  `condiciones` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objetos`
--

LOCK TABLES `objetos` WRITE;
/*!40000 ALTER TABLE `objetos` DISABLE KEYS */;
INSERT INTO `objetos` VALUES (48,'Fight Club','Dirigida por: David Fincher\nAño: 1999','casa de yuste','https://m.media-amazon.com/images/I/81JWVTlPQ2L._SL1500_.jpg','2023-05-02','2023-05-02',38,1,'Si pierdes la pelicula debes de pagarle al propietario (Yuste) lo que haya costado'),(49,'Pulp fiction','Director: Quentin Tarantino\nAño: 1994','casa de yuste','https://pics.filmaffinity.com/Pulp_Fiction-210382116-mmed.jpg','2023-05-02','2023-05-02',38,1,'Si se pierde o se rompe debe de reembolsarle el dinero al propietario'),(50,'Conocimiento del medio','Libro de conocimiento del medio, mitico','uma','https://imagessl6.casadellibro.com/a/l/t5/26/9788466769426.jpg','2023-05-02','2023-05-02',86,1,''),(51,'Diario de greg 1','OG','casa de yuste','https://m.media-amazon.com/images/I/91LtKsGoUmL.jpg','2023-05-02','2023-05-02',86,1,'Si lo pierdes debes de comprar el mismo libro y darselo al propietario'),(53,'Raqueta de padel Iker','Raqueta de Iker desde que era chiquito','casa de iker','https://cdn.shopify.com/s/files/1/0582/2450/9105/products/pala-de-padel-orven-maui-V2_600x.jpg?v=1657805260','2023-05-02','2023-05-02',87,2,'Si la rompes debes de pagarle la mitad de los que costo a Iker\nNo puedes reservarla durante más de 1 semana'),(54,'Pelotas de padel Rochu','Pelotas de padel del Decathlon de Rocío','casa de Rocío','https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202210/07/00108421300594____2__640x640.jpg','2023-05-02','2023-05-02',87,3,'Si pierdes mas de 3 pelotas debes de pagar todo el paquete'),(55,'IT','Autor: Stephen King\n','casa de la rochu','https://www.penguinlibros.com/es/2411100/it.jpg','2023-05-02','2023-05-02',86,3,'Nada más que termines de leer el libro debes devolverlo.\nSi tardas más de 2 meses en leerlo debes devolverlo'),(56,'PS4','','casa de paproka (humilladero)','https://m.media-amazon.com/images/I/71iKdXqlx2L._AC_SX679_.jpg','2023-05-02','2023-05-02',2,4,''),(57,'Nindendo Switch','','casa de rocío','https://www.tradeinn.com/f/13734/137343676/nintendo-switch.jpg','2023-05-02','2023-05-02',2,3,'aa'),(58,'Pista de padel de Paproka','Pista de padel de humilladero','humilladero','https://cadrete.es/wp-content/uploads/2020/09/Pista-padel-pabellon.jpg','2023-05-02','2023-05-02',87,4,'La pista de padel no puede ser usada por más de 6 personas.\nSe reserva por días.'),(59,'Los vengadores','','casa de Iker','https://lumiere-a.akamaihd.net/v1/images/the_avengers_2012_poster_july_disney_plus_drops_d4bd9c6e.png','2023-05-02','2023-05-02',38,2,''),(61,'Batman','Director: Matt Reeves\nAño: 2022','piso de rocio','https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2022/01/27/robert-pattinson-en-the-batman.jpeg','2023-05-02','2023-05-02',38,3,'No puedes reservarlo 2 veces seguidas'),(62,'Sudadera Adidas','','piso de Rocío','https://skipping.es/web/image/product.template/20648/image_1024?unique=3717aa2','2023-05-02','2023-05-02',4,3,''),(63,'Riñonera guapa','Riñonera multiusos. \nAtemporal','piso de paproka (teatinos)','https://images-eu.ssl-images-amazon.com/images/I/51A9rG%2B8HNL._AC_UL250_SR250,250_.jpg','2023-05-02','2023-05-02',4,4,''),(64,'Camiseta de 2pac','Camiseta de Pull and bear negra','casa de yuste','https://static.pullandbear.net/2/photos/2023/V/0/2/p/4240/596/800/4240596800_1_1_3.jpg?t=1637318288353','2023-05-02','2023-05-02',4,1,'Si la manchas debes comprarle al propietario una camiseta de Biggie'),(65,'Pantalones cargo','','piso de Rocío (teatinos)','https://images.ecestaticos.com/LsiYoIL8Zd6ojBX-puHxORDhROY=/0x0:2272x1704/1200x1200/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fee9%2F886%2F595%2Fee9886595e7c4dedb10984652e544f50.jpg','2023-05-02','2023-05-02',4,3,'No puedes reservarlo mas de 4 días'),(67,'Zapatillas Nike','Zapatillas blancas y negras. Están nuevas.','piso de Iker','https://media.gq.com.mx/photos/63a33e673a892f6e0ec57e6e/3:2/w_1938,h_1292,c_limit/Nike-Dunk-mid-panda.png','2023-05-02','2023-05-02',4,2,'Si las manchas o pierdes debes de comprarle al propietario unas jordan'),(68,'Portatil de Rocío','','piso de Rocío','https://www.educaciontrespuntocero.com/wp-content/uploads/2021/12/modelo-acer-1.jpg','2023-05-02','2023-05-02',88,3,''),(69,'Cargador de portatil Asus','Esta nuevo. Solo sirve para portátiles Asus.','piso de paproka','https://media.ldlc.com/r1600/ld/products/00/05/93/54/LD0005935491_1_0005942581.jpg','2023-05-02','2023-05-02',88,4,'Solo puedes tenerlo prestado 3 dias.'),(70,'Ratón inalámbrico de Iker','','piso de Iker','https://m.media-amazon.com/images/I/51CGX6Wr4NL._AC_SY355_.jpg','2023-05-02','2023-05-02',88,2,''),(71,'PS5','PS5 nueva. Incluye 2 mandos.','casa de yuste','https://www.gangaelectronica.es/173252-medium_default/consola-sony-ps5-playstation-5-edicion-4k-uhd-blu-ray.jpg','2023-05-02','2023-05-02',2,1,'Si la rompes debes de pagarle al propietario 600 euros.\nNo puedes reservarla durante más de 2 semanas.'),(72,'Zatura','','casa de paproka ','https://pics.filmaffinity.com/Zathura_una_aventura_espacial-689874214-large.jpg','2023-05-02','2023-05-02',38,4,'No puedes reservarla por más de 1 semana.'),(73,'Libro de Álgebra','Está duro.','piso de paproka','https://m.media-amazon.com/images/I/51JX27KH98L.jpg','2023-05-02','2023-05-02',88,4,'Libro de álgebra para el primer año de ingeniería.'),(74,'Libro de Python','Guía para aprender python de 0.','piso de Paproka','https://m.media-amazon.com/images/I/419I-gpsUzL.jpg','2023-05-02','2023-05-02',88,4,'Puedes tenerlo prestado como máximo 1 mes.'),(75,'El señor de los anillos','Primer libro de la saga de Tolkien.','casa de Paproka','https://m.media-amazon.com/images/I/41PiLJMCmiL._SX507_BO1,204,203,200_.jpg','2023-05-02','2023-05-02',86,4,'Si lo pierdes o rompes alguna página debes de comprarle el mismo libro al propietario.'),(76,'Botas de fútbol','botas de fútbol nike','casa de usuario','https://www.tradeinn.com/f/13853/138530464/nike-botas-futbol-superfly-8-elite-ag.jpg','2023-05-02','2023-05-02',89,18,'si las rompes o dañas debes de pagarle al usuario lo que le costó');
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (15,'2023-05-04','2023-05-07','2023-05-02','2023-05-02',1,48),(16,'2023-05-30','2023-06-01','2023-05-02','2023-05-02',1,48),(17,'2023-05-15','2023-05-19','2023-05-02','2023-05-02',1,50),(18,'2023-05-12','2023-05-15','2023-05-02','2023-05-02',1,56),(19,'2023-05-22','2023-05-31','2023-05-02','2023-05-02',1,67),(20,'2023-05-03','2023-05-04','2023-05-02','2023-05-02',2,58),(21,'2023-05-06','2023-05-07','2023-05-02','2023-05-02',2,58),(22,'2023-05-06','2023-05-11','2023-05-02','2023-05-02',2,72),(23,'2023-05-05','2023-05-13','2023-05-02','2023-05-02',2,73),(24,'2023-05-15','2023-05-31','2023-05-02','2023-05-02',2,74),(25,'2023-05-05','2023-05-09','2023-05-02','2023-05-02',2,62),(26,'2023-05-02','2023-05-08','2023-05-02','2023-05-02',3,49),(27,'2023-05-12','2023-05-14','2023-05-02','2023-05-02',3,63),(28,'2023-05-23','2023-05-26','2023-05-02','2023-05-02',3,63),(29,'2023-05-04','2023-05-14','2023-05-02','2023-05-02',3,51),(30,'2023-06-01','2023-06-04','2023-05-02','2023-05-02',3,51),(31,'2023-05-03','2023-05-08','2023-05-02','2023-05-02',3,53),(32,'2023-05-17','2023-05-22','2023-05-02','2023-05-02',3,53),(33,'2023-05-08','2023-05-11','2023-05-02','2023-05-02',3,56),(34,'2023-05-04','2023-05-09','2023-05-02','2023-05-02',3,70),(35,'2023-05-22','2023-05-26','2023-05-02','2023-05-02',3,70),(36,'2023-05-02','2023-05-14','2023-05-02','2023-05-02',4,71),(37,'2023-05-26','2023-05-29','2023-05-02','2023-05-02',4,71),(38,'2023-05-05','2023-05-08','2023-05-02','2023-05-02',4,57),(39,'2023-05-20','2023-05-22','2023-05-02','2023-05-02',4,57),(40,'2023-05-02','2023-06-02','2023-05-02','2023-05-02',4,55),(41,'2023-05-04','2023-05-08','2023-05-02','2023-05-02',4,65),(42,'2023-05-04','2023-05-08','2023-05-02','2023-05-02',4,64),(43,'2023-05-22','2023-05-29','2023-05-02','2023-05-02',4,64),(44,'2023-05-04','2023-05-16','2023-05-02','2023-05-02',4,54),(45,'2023-05-12','2023-05-13','2023-05-02','2023-05-02',4,58),(46,'2023-05-14','2023-05-15','2023-05-02','2023-05-02',4,58),(47,'2023-05-02','2023-05-15','2023-05-02','2023-05-02',4,68),(48,'2023-05-02','2023-05-29','2023-05-02','2023-05-02',1,75),(49,'2023-05-30','2023-06-04','2023-05-02','2023-05-02',4,75),(50,'2023-05-02','2023-05-08','2023-05-02','2023-05-02',1,61),(51,'2023-05-03','2023-05-08','2023-05-02','2023-05-02',1,63),(52,'2023-05-16','2023-05-28','2023-05-02','2023-05-02',1,63);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'yuste','yuste@uma.es','yuste','alvaro','yuste moreno',NULL,NULL),(2,'iker','iker@uma.es','iker','Iker','galvez castillo',NULL,'2023-04-29'),(3,'rocio','rocio@uma.es','rocio','rocio','gomez mancebo',NULL,NULL),(4,'paproka','paproka@uma.es','paproka','pablo','alarcon carrion',NULL,NULL),(18,'usuario','usuario@ejemplo.es','usuario','usuario','ejemplo','2023-05-02','2023-05-02');
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

-- Dump completed on 2023-05-02 19:05:23
