-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Lun 25 Novembre 2019 à 03:02
-- Version du serveur :  5.7.27-0ubuntu0.19.04.1
-- Version de PHP :  7.2.24-0ubuntu0.19.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `mairie_ayama`
--

-- --------------------------------------------------------

--
-- Structure de la table `ActeNaissance`
--

CREATE TABLE `ActeNaissance` (
  `id` int(11) NOT NULL,
  `etablissement_id` int(11) NOT NULL,
  `circonscrit` varchar(100) NOT NULL,
  `centre` varchar(100) NOT NULL,
  `numeroAccouchement` varchar(50) NOT NULL,
  `sousigne` varchar(100) NOT NULL,
  `dateAccouche` datetime NOT NULL,
  `timeAccouche` varchar(50) NOT NULL,
  `recuLe` datetime DEFAULT NULL,
  `recuA` varchar(50) DEFAULT NULL,
  `dateNe` datetime DEFAULT NULL,
  `dateA` varchar(50) NOT NULL,
  `sexe` varchar(50) NOT NULL,
  `vivant` tinyint(1) NOT NULL,
  `nameEnfant` varchar(50) NOT NULL,
  `firstnameEnfant` varchar(200) NOT NULL,
  `namePapa` varchar(200) NOT NULL,
  `dateNaissancePapa` datetime DEFAULT NULL,
  `lieuNassancePapa` varchar(100) DEFAULT NULL,
  `professionPapa` varchar(100) DEFAULT NULL,
  `domicilePapa` varchar(100) DEFAULT NULL,
  `nationnalitePapa` varchar(100) NOT NULL,
  `titrePapa` varchar(100) DEFAULT NULL,
  `contactPapa` varchar(50) DEFAULT NULL,
  `nameMaman` varchar(200) NOT NULL,
  `dateNaissanceMaman` datetime DEFAULT NULL,
  `lieuNassanceMaman` varchar(100) DEFAULT NULL,
  `professionMaman` varchar(100) DEFAULT NULL,
  `domicileMaman` varchar(100) DEFAULT NULL,
  `nationnaliteMaman` varchar(100) DEFAULT NULL,
  `titreMaman` varchar(100) DEFAULT NULL,
  `contactMaman` varchar(100) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateInLetter` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `ActeNaissance`
--

INSERT INTO `ActeNaissance` (`id`, `etablissement_id`, `circonscrit`, `centre`, `numeroAccouchement`, `sousigne`, `dateAccouche`, `timeAccouche`, `recuLe`, `recuA`, `dateNe`, `dateA`, `sexe`, `vivant`, `nameEnfant`, `firstnameEnfant`, `namePapa`, `dateNaissancePapa`, `lieuNassancePapa`, `professionPapa`, `domicilePapa`, `nationnalitePapa`, `titrePapa`, `contactPapa`, `nameMaman`, `dateNaissanceMaman`, `lieuNassanceMaman`, `professionMaman`, `domicileMaman`, `nationnaliteMaman`, `titreMaman`, `contactMaman`, `user_id`, `register_date`, `dateInLetter`) VALUES
(1, 3, 'Anyama', 'Anyama', '0000000125368', 'Mme Souligné focus - Sage Femme - D\'etat', '2019-11-26 00:00:00', '15:59', '2019-11-28 00:00:00', '', NULL, '', 'masculin', 1, 'Coré', 'Irié Wilfied Mondesir', 'Coré Irié Film ', '2019-11-14 00:00:00', 'Divo', 'Professeur', 'Divo', 'Ivoirienne', 'Extrait d\'acte de naissance', '+22548803377', 'Gisel Melec', '2019-11-28 00:00:00', 'Divo', 'Eleve', 'Divo', 'Ivoirienne', 'Extrait d\'acte de naissance', '+22543329239', 1, '2019-11-24 00:00:00', ''),
(4, 2, 'Anyama', 'Anyama', '0000000555368', 'Mme Souligné focus - Sage Femme - D\'etat', '2019-11-24 00:00:00', '23:26', '2019-11-25 00:00:00', '', '2019-11-26 00:00:00', '', 'feminin', 1, 'Ange', 'Patrick', 'Ange Melem', '2019-11-25 00:00:00', 'Divo', 'Professeur', 'Divo', 'Ivoirienne', 'Extrait d\'acte de naissance', '+22548903377', 'Angelina Fabienne', '1990-12-25 00:00:00', 'Abidjan', 'Eleve', 'Divo', 'Ivoirienne', 'Extrait d\'acte de naissance', '+22553329239', 1, '2019-11-24 00:00:00', 'Le vingt quatre décembre,deux milles dix neuf');

-- --------------------------------------------------------

--
-- Structure de la table `Etablissement`
--

CREATE TABLE `Etablissement` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `Etablissement`
--

INSERT INTO `Etablissement` (`id`, `name`, `register_date`) VALUES
(1, 'Saint Viateur', '2019-11-23 11:08:32'),
(2, 'CHU 2 ', '2019-11-24 00:36:03'),
(3, 'Clinique RSA', '2019-11-24 00:39:50'),
(4, 'Focus', '2019-11-24 00:41:16'),
(5, 'Fake', '2019-11-24 00:42:59');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'Admin');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `login_date` datetime DEFAULT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `photo` varchar(200) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `archive` int(11) NOT NULL DEFAULT '1',
  `cryptEmail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `pseudo`, `name`, `firstname`, `contact`, `email`, `password`, `address`, `login_date`, `register_date`, `photo`, `role_id`, `archive`, `cryptEmail`) VALUES
(1, 'ryu225', 'Coré', 'Irié Wilfried', '48803377', 'core.irie@gmail.com', '$2b$10$l4bSxDNGWcWoZio0WBLG6.zZsq/FNrk60q26msfCjbvh13Mc8OWPW', 'Abidjan Rivera palmeraie', '2019-11-23 22:20:31', '2019-11-23 00:35:46', NULL, 1, 1, '$2b$10$l4bSxDNGWcWoZio0WBLG6.zZsq/FNrk60q26msfCjbvh13Mc8OWPW');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `ActeNaissance`
--
ALTER TABLE `ActeNaissance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etablissement_id` (`etablissement_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `Etablissement`
--
ALTER TABLE `Etablissement`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `ActeNaissance`
--
ALTER TABLE `ActeNaissance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `Etablissement`
--
ALTER TABLE `Etablissement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `ActeNaissance`
--
ALTER TABLE `ActeNaissance`
  ADD CONSTRAINT `ActeNaissance_ibfk_1` FOREIGN KEY (`etablissement_id`) REFERENCES `Etablissement` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ActeNaissance_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
