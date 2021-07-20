CREATE TABLE `actions_log` (
  `id` int(11) NOT NULL,
  `table_name` text DEFAULT NULL,
  `action` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

