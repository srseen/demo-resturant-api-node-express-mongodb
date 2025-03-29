CREATE TABLE `Category` (
  `id` int PRIMARY KEY,
  `title` varchar(255) UNIQUE NOT NULL,
  `imageUrl` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `Food` (
  `id` int PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal NOT NULL,
  `imageUrl` varchar(255),
  `category_id` int NOT NULL,
  `rating` decimal NOT NULL DEFAULT 5,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `Restaurant` (
  `id` int PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `imageUrl` varchar(255),
  `rating` decimal DEFAULT 1,
  `coords_id` int,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `Restaurant_Foods` (
  `restaurant_id` int,
  `food_id` int
);

CREATE TABLE `Coords` (
  `id` int PRIMARY KEY,
  `latitude` decimal,
  `latitudeDelta` decimal,
  `longitude` decimal,
  `longitudeDelta` decimal,
  `address` varchar(255),
  `title` varchar(255)
);

CREATE TABLE `User` (
  `id` int PRIMARY KEY,
  `userName` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `userType` varchar(255) DEFAULT 'client' COMMENT 'Possible values: client, admin',
  `profile` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

ALTER TABLE `Food` ADD FOREIGN KEY (`category_id`) REFERENCES `Category` (`id`);

ALTER TABLE `Restaurant` ADD FOREIGN KEY (`coords_id`) REFERENCES `Coords` (`id`);

ALTER TABLE `Restaurant_Foods` ADD FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurant` (`id`);

ALTER TABLE `Restaurant_Foods` ADD FOREIGN KEY (`food_id`) REFERENCES `Food` (`id`);
