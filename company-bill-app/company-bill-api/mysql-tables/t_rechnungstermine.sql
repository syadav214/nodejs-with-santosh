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
-- Tabellenstruktur für Tabelle `t_rechnungstermine`
--

CREATE TABLE `t_rechnungstermine` (
  `id` int(11) NOT NULL,
  `company_ID` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `purpose` text DEFAULT NULL,
  `reminder` int(11) DEFAULT 0,
  `amount` double DEFAULT 0,
  `billNumber` int(11) NOT NULL DEFAULT 0,
  `fraction` double DEFAULT 0,
  `done` tinyint(4) DEFAULT 0,
  `status` int(11) DEFAULT 0,
  `billHtml` mediumtext DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `Komment` varchar(500) DEFAULT NULL,
  `halfbills` float DEFAULT 0,
  `printeddate` date DEFAULT NULL,
  `signeddate` date DEFAULT NULL,
  `Unsicher` int(11) DEFAULT NULL,
  `ignored` tinyint(1) DEFAULT 0,
  `aktenziech` varchar(100) DEFAULT NULL,
  `billtext` varchar(2000) DEFAULT NULL,
  `payday` varchar(100) DEFAULT NULL,
  `csvfilename` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Trigger `t_rechnungstermine`
--
DELIMITER $$
CREATE TRIGGER `bills_D` BEFORE DELETE ON `t_rechnungstermine` FOR EACH ROW insert into actions_log(table_name, action, details, created_at, user) values('t_rechnungstermine','delete', CONCAT('{id:',old.id,', company_ID:',old.company_ID,', date:',old.date,', billNumber:',old.billNumber, ',fraction:',old.fraction,', amount:',old.amount,', status:',old.status,', halfbills:',old.halfbills, ',Komment:',old.Komment,'}'), NOW(),1)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `bills_U` AFTER UPDATE ON `t_rechnungstermine` FOR EACH ROW insert into actions_log(table_name, action, details, created_at, user) values('t_rechnungstermine','update', CONCAT('{old: {id:',old.id,', company_ID:',old.company_ID,', date:',old.date,', billNumber:',old.billNumber, ',fraction:',old.fraction,', amount:',old.amount,', status:',old.status,', halfbills:',old.halfbills, ',Komment:',old.Komment,'},','new: {id:',new.id,', company_ID:',new.company_ID,', date:',new.date,', billNumber:',new.billNumber, ',fraction:',new.fraction,', amount:',new.amount,', status:',new.status,', halfbills:',new.halfbills, ',Komment:',new.Komment,'}}'), NOW(),1)
$$
DELIMITER ;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `t_rechnungstermine`
--
ALTER TABLE `t_rechnungstermine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_t_rechnungstermine_t_firmen` (`company_ID`),
  ADD KEY `payout_date` (`date`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `t_rechnungstermine`
--
ALTER TABLE `t_rechnungstermine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
