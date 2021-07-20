CREATE TABLE `tblCases` (
  `caseId` int(11) NOT NULL,
  `officerId` int(11) DEFAULT 0,
  `bikeOwnerName` text DEFAULT NULL,
  `isResolved` BOOLEAN DEFAULT 0,
  `stolen_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `tblCases`
  ADD PRIMARY KEY (`caseId`);

ALTER TABLE `tblCases`
  MODIFY `caseId` int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO tblCases (bikeOwnerName) VALUES ('Sameer');

INSERT INTO tblCases (bikeOwnerName) VALUES ('Ajit');

INSERT INTO tblCases (bikeOwnerName) VALUES ('Hema');
