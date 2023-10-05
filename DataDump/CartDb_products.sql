-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 192.168.56.115    Database: CartDb
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT 'yes',
  `price` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isAvailable` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Trunk Liner','270','Exterior','../img/uploads/TrunkLiner.jpg','2023-08-10 02:05:59','2023-09-27 17:03:41','yes'),(2,'Cargo mats','220','Interior','../img/uploads/CargoMats.jpg','2023-08-10 02:06:29','2023-09-26 14:44:14','yes'),(12,'Roof Racks','460','Exterior','../img/uploads/RoofRack.jpg','2023-08-12 01:14:45','2023-09-26 13:01:40','yes'),(24,'Pet Liner','145','Interior','../img/uploads/Pet-Liner.jpg','2023-08-20 14:42:00','2023-09-26 13:01:09','yes'),(25,'Glass Sunshade','105','Interior','../img/uploads/Glass Sunshade.jpg','2023-08-20 14:42:57','2023-09-26 13:18:58','yes'),(26,'Roof Sunshade','125','Interior','../img/uploads/Roof Sunshade.jpg','2023-08-20 14:43:41','2023-09-26 13:19:08','yes'),(27,'Carbon Fiber Spoiler','800','Exterior','../img/uploads/Carbon Filber Spoiled.jpg','2023-08-20 14:49:00','2023-09-26 13:19:16','yes'),(28,'Pedal Set','60','Interior','../img/uploads/Pedal Set.jpg','2023-08-20 14:49:57','2023-08-20 14:49:57','yes'),(29,'Snow Chains','265','Exterior','../img/uploads/Snow Chains.jpg','2023-08-20 14:52:41','2023-09-26 13:16:51','yes'),(30,'Mud Flaps','40','Exterior','../img/uploads/Mud Flaps.jpg','2023-08-20 14:53:57','2023-08-20 14:53:57','yes'),(31,'Car Cover','300','Exterior','../img/uploads/Car Cover.jpg','2023-08-20 14:55:24','2023-08-20 14:55:24','yes'),(32,'Tire Repair Kit','70','Accessories','../img/uploads/Tire Repair Kit.jpg','2023-08-20 14:56:27','2023-08-20 14:56:27','yes'),(33,'Wheel Locks','50','Exterior','../img/uploads/Wheel Locks.jpg','2023-08-20 14:57:05','2023-08-20 14:57:05','yes'),(34,'Key Fob','175','Accessories','../img/uploads/Key Fob.jpg','2023-08-20 14:57:38','2023-08-20 14:57:38','yes'),(35,'Center Console Tray','35','Interior','../img/uploads/Center Console Trays.jpg','2023-08-20 14:58:25','2023-08-20 14:58:25','yes'),(41,'Key Card','35','Accessories','../img/uploads/Key Card.jpg','2023-08-20 15:18:17','2023-08-20 15:18:17','yes'),(42,'Hitch Rack','450','Exterior','../img/uploads/Hitch Rack.jpg','2023-08-20 15:18:39','2023-08-20 15:18:39','yes'),(44,'Rims','1800','Exterior','../img/uploads/Rims19.png','2023-09-25 21:29:33','2023-09-25 21:37:20','yes');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-05 11:16:43
