-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 15 juil. 2024 à 13:48
-- Version du serveur :  5.7.31
-- Version de PHP : 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `my_app`
--

-- --------------------------------------------------------

--
-- Structure de la table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `providerType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `providerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `providerAccountId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refreshToken` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accessToken` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accessTokenExpires` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Account_userId_fkey` (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `carousel`
--

DROP TABLE IF EXISTS `carousel`;
CREATE TABLE IF NOT EXISTS `carousel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rank` int(11) NOT NULL DEFAULT '0',
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `church`
--

DROP TABLE IF EXISTS `church`;
CREATE TABLE IF NOT EXISTS `church` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `about` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `creationDate` datetime(3) NOT NULL,
  `regionId` int(11) NOT NULL,
  `districtId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Church_regionId_fkey` (`regionId`),
  KEY `Church_districtId_fkey` (`districtId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `district`
--

DROP TABLE IF EXISTS `district`;
CREATE TABLE IF NOT EXISTS `district` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `page`
--

DROP TABLE IF EXISTS `page`;
CREATE TABLE IF NOT EXISTS `page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isPublic` tinyint(1) NOT NULL DEFAULT '1',
  `tumbnail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `page` int(11) NOT NULL DEFAULT '1',
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `page`
--

INSERT INTO `page` (`id`, `title`, `content`, `isPublic`, `tumbnail`, `page`, `type`) VALUES
(1, 'Bienvenu dans notre site web', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi quisquam delectus, quos dolor sequi similique! Doloribus accusamus consectetur a voluptatum.', 1, '/uploads/page/page_cf48c641-0f02-466b-a9e7-85a7de244c07_hero.jpeg', 1, 'hero'),
(4, 'Lorem ispum', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi quisquam delectus, quos dolor sequi similique! Doloribus accusamus consectetur a voluptatum.', 1, '/uploads/page/page_47f493cb-0197-4183-8b9b-30c139c0d0e2_home2.png', 1, '2'),
(5, 'Actualité 1', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi quisquam delectus, quos dolor sequi similique! Doloribus accusamus consectetur a voluptatum.', 1, '/uploads/page/page_47f493cb-0197-4183-8b9b-30c139c0d0e2_home2.png', 1, '2'),
(6, 'Eglise', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde modi voluptatem autem laboriosam!', 1, '/uploads/page/page_9843b357-d732-4c41-93b1-612297c6f0f1_Basilique_Saint-Pierre,_Vatican.jpg', 1, '1'),
(7, 'Actualité 2', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi quisquam delectus, quos dolor sequi similique! Doloribus accusamus consectetur a voluptatum.', 1, '/uploads/page/page_47f493cb-0197-4183-8b9b-30c139c0d0e2_home2.png', 1, '2'),
(8, 'Actualité 3', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi quisquam delectus, quos dolor sequi similique! Doloribus accusamus consectetur a voluptatum.', 1, '/uploads/page/page_47f493cb-0197-4183-8b9b-30c139c0d0e2_home2.png', 1, '2'),
(9, 'Actualité 4', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi quisquam delectus, quos dolor sequi similique! Doloribus accusamus consectetur a voluptatum.', 1, '/uploads/page/page_47f493cb-0197-4183-8b9b-30c139c0d0e2_home2.png', 1, '2');

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isPublic` tinyint(1) NOT NULL DEFAULT '1',
  `tumbnail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `preast`
--

DROP TABLE IF EXISTS `preast`;
CREATE TABLE IF NOT EXISTS `preast` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `about` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `displayFront` tinyint(1) NOT NULL DEFAULT '0',
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `region`
--

DROP TABLE IF EXISTS `region`;
CREATE TABLE IF NOT EXISTS `region` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `districtId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Region_districtId_fkey` (`districtId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Role_label_key` (`label`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE IF NOT EXISTS `session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `expires` datetime(3) NOT NULL,
  `sessionToken` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessToken` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  UNIQUE KEY `Session_accessToken_key` (`accessToken`),
  KEY `Session_userId_fkey` (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `roleId` int(11) NOT NULL,
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashedPassword` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  KEY `User_roleId_fkey` (`roleId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `emailVerified`, `image`, `createdAt`, `updatedAt`, `roleId`, `thumbnail`, `hashedPassword`) VALUES
(1, 'niraina', 'andriamiarintsoaniraina@gmail.com', NULL, NULL, '2024-07-08 17:11:18.925', '2024-07-08 17:11:18.925', 1, NULL, '$2a$10$pkkVncpb084H6H9.Ud5VkuNNzbP1Yhq9yIEaTtLAedGnJEj/j3L/C');

-- --------------------------------------------------------

--
-- Structure de la table `verificationrequest`
--

DROP TABLE IF EXISTS `verificationrequest`;
CREATE TABLE IF NOT EXISTS `verificationrequest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `VerificationRequest_token_key` (`token`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('44903f4f-f0ae-4121-8761-96b6c0d3c3c8', '281e0dcd743d8279f09fd02a67cdf1e491a2fd47d1981482b90d416cde0043f5', '2024-07-08 16:50:22.712', '20240621191150_init', NULL, NULL, '2024-07-08 16:50:22.663', 1),
('0fd46492-8c3c-453e-84bd-efd8e9af40fc', 'a1edf482b6e600fbad9205b95f5094f370ee25fc18087295c7596a2acc94dbd6', '2024-07-08 16:50:22.766', '20240621191228_thumbnail', NULL, NULL, '2024-07-08 16:50:22.713', 1),
('93cbb4bd-5ea0-45ea-853a-43cef8685519', '2c5c28cb0deddc79063de50f9cc8735374d3d7a76de7b1d99fec4dc62a7dc3b6', '2024-07-08 16:50:22.843', '20240621191328_test', NULL, NULL, '2024-07-08 16:50:22.767', 1),
('0fdf226e-1b34-4322-8525-217c2a1a7a33', '05acb245bf1f2416f3dff8cdc726055a97a46f46bd1bc0b203a9ba52c00f4f0b', '2024-07-08 16:50:22.968', '20240621191352_token', NULL, NULL, '2024-07-08 16:50:22.844', 1),
('8c64a884-6472-484d-bb14-95714bfe66aa', '2fc4a13c26faf5d757351f83d9b1dde62d859946d6d43b2b4bcff9b74ce973e1', '2024-07-08 16:50:23.040', '20240621192710_hashpassword', NULL, NULL, '2024-07-08 16:50:22.969', 1),
('835703a2-f793-423e-bf1c-a27045c08b8f', 'd823410df22df94e329ba67b5e5123181386025b6b594b3af7030ec33539f466', '2024-07-08 16:50:23.108', '20240621192803_hashpassword_1', NULL, NULL, '2024-07-08 16:50:23.040', 1),
('db0c28f9-bc55-4012-8b9c-7e8d0dc92565', '99673bba484bc802ae24e20d97f988a35fb5982a982b0774c4c56b763df7bc6a', '2024-07-08 16:50:33.079', '20240708165032_preast', NULL, NULL, '2024-07-08 16:50:32.955', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
