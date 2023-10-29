-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: themobilehourdb
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `changelog`
--

DROP TABLE IF EXISTS `changelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `changelog` (
  `changelog_id` int NOT NULL AUTO_INCREMENT,
  `date_created` date DEFAULT NULL,
  `date_last_modified` date DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`changelog_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `changelog_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `changelog_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changelog`
--

LOCK TABLES `changelog` WRITE;
/*!40000 ALTER TABLE `changelog` DISABLE KEYS */;
INSERT INTO `changelog` VALUES (1,'2023-09-25','2023-09-25',6,3),(2,'2023-09-25','2023-09-25',2,5),(3,'2023-09-25','2023-09-25',2,5),(4,'2023-09-25','2023-09-25',2,5),(5,'2023-09-25','2023-09-25',2,5),(7,'2023-09-25','2023-09-25',7,7),(8,'2023-09-25','2023-09-25',7,8),(9,'2023-09-25','2023-09-25',7,9),(12,'2023-09-25','2023-09-25',7,12),(13,'2023-09-26','2023-09-26',7,1),(14,'2023-09-26','2023-09-26',7,1),(15,'2023-09-26','2023-09-26',7,1),(16,'2023-09-25','2023-09-26',7,3),(17,'2023-09-26','2023-09-26',7,4),(18,'2023-09-25','2023-09-26',7,5),(19,'2023-09-25','2023-09-26',7,5),(20,'2023-09-25','2023-09-26',7,7),(21,'2023-09-25','2023-09-26',7,8),(23,'2023-09-25','2023-09-27',7,9),(25,'2023-09-25','2023-10-02',7,8),(26,'2023-09-26','2023-10-03',2,1),(28,'2023-09-25','2023-10-03',2,5),(30,'2023-09-25','2023-10-03',2,9),(31,'2023-10-18','2023-10-18',7,5),(32,'2023-10-18','2023-10-18',7,7),(35,'2023-10-18','2023-10-18',7,13);
/*!40000 ALTER TABLE `changelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `cust_phone` varchar(15) DEFAULT NULL,
  `cust_email` varchar(255) DEFAULT NULL,
  `cust_password` varchar(255) DEFAULT NULL,
  `cust_address` text,
  `postcode` varchar(10) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `cust_email` (`cust_email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Julia','Hoarau',NULL,'jh@email.com','$2a$10$06lV5Nv9s6rXI.D4U3OrWuKEYwR4OhqqWU/8serVIjaLuPlOleRA6',NULL,NULL,NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feature`
--

DROP TABLE IF EXISTS `feature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feature` (
  `feature_id` int NOT NULL AUTO_INCREMENT,
  `weight` decimal(5,2) DEFAULT NULL,
  `dimension` varchar(255) DEFAULT NULL,
  `OS` varchar(255) DEFAULT NULL,
  `screensize` decimal(5,2) DEFAULT NULL,
  `resolution` varchar(255) DEFAULT NULL,
  `CPU` varchar(255) DEFAULT NULL,
  `RAM` varchar(50) DEFAULT NULL,
  `storage` varchar(255) DEFAULT NULL,
  `battery` varchar(255) DEFAULT NULL,
  `rear_camera` varchar(50) DEFAULT NULL,
  `front_camera` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`feature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feature`
--

LOCK TABLES `feature` WRITE;
/*!40000 ALTER TABLE `feature` DISABLE KEYS */;
INSERT INTO `feature` VALUES (1,172.00,'5.78 x 2.82 (inches)','Apple',6.10,'460 ppi','A16 Bionic','6GB','256GB','Video playback up to 20 hours','12MP (wide), 12MP (ultrawide)','12MP');
/*!40000 ALTER TABLE `feature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `order_details_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price_sold` decimal(10,2) DEFAULT NULL,
  `order_number` int DEFAULT NULL,
  PRIMARY KEY (`order_details_id`),
  KEY `product_id` (`product_id`),
  KEY `order_number` (`order_number`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`order_number`) REFERENCES `orders` (`order_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_number` int NOT NULL AUTO_INCREMENT,
  `order_date` date DEFAULT NULL,
  `order_delivery_date` date DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  PRIMARY KEY (`order_number`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_model` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock_on_hand` int DEFAULT NULL,
  `feature_id` int DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `feature_id` (`feature_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`feature_id`) REFERENCES `feature` (`feature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'iPhone 14','Apple',1499.00,5,1,'uploads/1695703889127-iphone14.jpg'),(3,'Samsung Galaxy A34','Samsung',445.00,4,1,'uploads/1695704279753-samsunga34.jpg'),(4,'Google Pixel 7','Google',800.00,6,1,'uploads/1695731120327-google-pixel7.jpg'),(5,'OPPOReno 10','OPPO',750.00,2,1,'uploads/1695732016085-oppo-reno-10.jpg'),(7,'Motorola Razr 40 Ultra','Motorola',1499.00,4,1,'uploads/1695732325245-motorolarazr.jpg'),(8,'Samsung Galaxy ZFlip','Samsung',799.00,2,1,'uploads/1696216408633-samsung-galaxy-z-flip-1.jpg'),(9,'Apple iPhone 13','Apple',1349.00,7,1,'uploads/1695796026264-iphon13.jpg'),(12,'Samsung Galaxy S23','Samsung',1097.00,7,1,'uploads/1695648372141-samsung-galaxy-s23-5g-combo.jpg'),(13,'NOKIA G50','NOKIA',449.00,4,1,'uploads/1697561407876-nokiag50.jpg');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `user_role` varchar(50) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'Ben','Smith','admin manager','bennyboy','$2b$10$VeGFC7uv.Lxv./aStqi6BeGJUyy/nQGEylbW2jOqyxQLkK7LpFxgK'),(3,'Julia','Hoarau','admin manager','juliahoarau','12345'),(6,'jordan','Mads','admin','dossa','$2a$10$1Z3m60OlWJahtwDi2qcloOILPi9PXcZL8vz8kDOe8aU0zu1t5n6Tq'),(7,'Vanessa','Port','admin manager','nessa','$2a$10$WfMNGkqp5O4HQcXAd.RDhuGgCbYMEn6wjRHgRIM2rK7RJu0dS4P4W');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-24  3:57:49
