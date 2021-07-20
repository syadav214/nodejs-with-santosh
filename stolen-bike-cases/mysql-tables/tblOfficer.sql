CREATE TABLE `tblOfficers` (
  `officerId` int(11) NOT NULL,
  `officerName` text DEFAULT NULL
);

ALTER TABLE `tblOfficers`
  ADD PRIMARY KEY (`officerId`);

ALTER TABLE `tblOfficers`
  MODIFY `officerId` int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO tblOfficers (officerName) VALUES ('santosh');
INSERT INTO tblOfficers (officerName) VALUES ('shailesh');
INSERT INTO tblOfficers (officerName) VALUES ('sunny');


/*
select * from tblCases Where officerId = 0; --Get count and use in LIMIT clause of below query
select officerId  from tblOfficers where officerId not in (select officerId from tblCases where isResolved = 0);
*/
