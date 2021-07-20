-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: muc-1-db-1
-- Erstellungszeit: 21. Feb 2019 um 16:45
-- Server-Version: 10.3.9-MariaDB-1:10.3.9+maria~stretch-log
-- PHP-Version: 7.2.9-1+0~20180910100512.5+stretch~1.gbpdaac35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `db_ida`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `t_firmen`
--

CREATE TABLE `t_firmen` (
  `id` int(11) NOT NULL,
  `project_ID` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `fundingCode` varchar(255) DEFAULT NULL,
  `referenceNr` varchar(255) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `funding` double DEFAULT NULL,
  `jae` float DEFAULT NULL,
  `annualSales` float DEFAULT NULL,
  `markupFactor` float DEFAULT NULL,
  `fundingRate` float DEFAULT NULL,
  `maxSalary` float DEFAULT NULL,
  `comment` varchar(1999) DEFAULT NULL,
  `street` varchar(255) DEFAULT '',
  `code` varchar(50) DEFAULT '',
  `city` varchar(50) DEFAULT '',
  `country` varchar(50) DEFAULT NULL,
  `customerNumber` int(11) DEFAULT NULL,
  `salesTax` float DEFAULT NULL,
  `fee` double DEFAULT NULL,
  `contactGender` varchar(50) DEFAULT NULL,
  `contactPrename` varchar(255) DEFAULT NULL,
  `contactName` varchar(255) DEFAULT NULL,
  `contactEmail` varchar(255) DEFAULT NULL,
  `billsGenerated` tinyint(1) DEFAULT 0,
  `contactPrename2` varchar(50) DEFAULT NULL,
  `contactName2` varchar(50) DEFAULT NULL,
  `contactEmail2` varchar(50) DEFAULT NULL,
  `contactGender2` varchar(50) DEFAULT NULL,
  `Bewilligungsbescheid` varchar(50) DEFAULT NULL,
  `Antrag` varchar(50) DEFAULT NULL,
  `Zustandiger` varchar(50) DEFAULT NULL,
  `Fax` varchar(50) DEFAULT NULL,
  `Mail` varchar(50) DEFAULT NULL,
  `Telefon` varchar(50) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `Fakultat` varchar(10000) DEFAULT NULL,
  `Department` varchar(10000) DEFAULT NULL,
  `phone1` varchar(50) DEFAULT NULL,
  `phone2` varchar(50) DEFAULT NULL,
  `empfangsbestatigung` tinyint(1) DEFAULT NULL,
  `date1` varchar(20) DEFAULT NULL,
  `date2` varchar(20) DEFAULT NULL,
  `stundensatz` double DEFAULT NULL,
  `maxhours` varchar(50) DEFAULT NULL,
  `maxhours2` varchar(50) DEFAULT NULL,
  `contactgender3` varchar(50) DEFAULT NULL,
  `contactname3` varchar(250) DEFAULT NULL,
  `contactprename3` varchar(250) DEFAULT NULL,
  `contactphone3` varchar(250) DEFAULT NULL,
  `contacthours3` varchar(250) DEFAULT NULL,
  `contactmail3` varchar(250) DEFAULT NULL,
  `partner` varchar(250) DEFAULT NULL,
  `amountcomp` varchar(50) DEFAULT NULL,
  `amountpar` varchar(50) DEFAULT NULL,
  `fee2` varchar(50) DEFAULT NULL,
  `belingcheck` tinyint(1) DEFAULT NULL,
  `fuecheck` tinyint(1) DEFAULT NULL,
  `belingsum` double DEFAULT NULL,
  `FuEsum` double DEFAULT NULL,
  `sendtocontact1` tinyint(1) NOT NULL DEFAULT 0,
  `sendtocontact2` tinyint(1) NOT NULL DEFAULT 0,
  `sendtocontact3` tinyint(1) NOT NULL DEFAULT 0,
  `fehler` tinyint(1) DEFAULT NULL,
  `benachrichtigungAus` tinyint(1) DEFAULT NULL,
  `first_tranche` int(11) NOT NULL DEFAULT 50,
  `cost` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `showcomp` tinyint(1) DEFAULT 0,
  `street2` varchar(50) DEFAULT NULL,
  `contactgender4` varchar(50) DEFAULT NULL,
  `contactprename4` varchar(255) DEFAULT NULL,
  `contactname4` varchar(255) DEFAULT NULL,
  `contactmail4` varchar(255) DEFAULT NULL,
  `sendtocontact4` tinyint(4) DEFAULT NULL,
  `contactphone4` varchar(250) DEFAULT NULL,
  `contacthours4` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `t_firmen`
--
ALTER TABLE `t_firmen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_t_firmen_t_projekte` (`project_ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `t_firmen`
--
ALTER TABLE `t_firmen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `t_firmen`
--
ALTER TABLE `t_firmen`
  ADD CONSTRAINT `FK_t_firmen_t_projekte` FOREIGN KEY (`project_ID`) REFERENCES `t_projekte` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
