
/*
Database - karel_app
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`karel_app2` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `karel_app2`;

/*Table structure for table `survey` */

DROP TABLE IF EXISTS `survey`;

CREATE TABLE `survey` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `company` varchar(250) DEFAULT NULL,
  `expectations` text,
  `hyp_azure` int(11) DEFAULT NULL,
  `hyp_gcp` int(11) DEFAULT NULL,
  `hyp_aws` int(11) DEFAULT NULL,
  `na_ontap` int(11) DEFAULT NULL,
  `na_cloudmanager` int(11) DEFAULT NULL,
  `na_cvo` int(11) DEFAULT NULL,
  `na_cvs_anf` int(11) DEFAULT NULL,
  `na_cloud_insight` int(11) DEFAULT NULL,
  `na_cloudsync` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `survey` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
