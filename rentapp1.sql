-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2021 at 07:06 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `cate_id` int(11) NOT NULL,
  `cate_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cate_id`, `cate_name`) VALUES
(1, 'Electronic Devices'),
(2, 'Electronic Accessories');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `chat_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `recvier_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `contract`
--

CREATE TABLE `contract` (
  `contract_id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL,
  `consumer_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `rating_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL DEFAULT current_timestamp(),
  `end_time` datetime NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ongoing'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `availability` varchar(255) NOT NULL DEFAULT 'available',
  `price` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `cate_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `item_name`, `availability`, `price`, `image_url`, `cate_id`) VALUES
(1, 'mouse', 'available', 80, 'none', 1),
(19, 'keyboard', 'available', 100, 'pata nhi', 1),
(20, 'monitor', 'available', 50, 'pata nhi', 1),
(22, 'moni88tor', 'available', 50, 'pata nhi', 1),
(23, 'mouse', 'available', 500, 'pata nhi', 1),
(30, 'none', 'available', 30, '/asd', 2),
(31, 'monitorhd', 'available', 200, 'pata nhi', 1),
(32, 'headphone', 'available', 500, 'pata nhi', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `rating_id` int(11) NOT NULL,
  `score` int(5) NOT NULL,
  `feedback` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cnic` varchar(15) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phone` int(15) NOT NULL,
  `streetno` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `birthdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `cnic`, `firstname`, `lastname`, `phone`, `streetno`, `city`, `country`, `birthdate`) VALUES
(1, 'asad@gmail.com', '$2b$12$.jjShfPbgpR6hvAVEGoqeeg5.JqM7jhU1JZebgl9Ws6NQ00STeVPa', '14325-1264522-1', 'asad', 'none', 314876523, 'phase-1', 'karachi', 'pakistan', '2001-02-06'),
(3, 'bari@gmail.com', '$2b$12$kUGKWGxP/2qDz4ifjdbIseMaLfP4ZjzFdPWF4ZcrizAQ5VtJ242ou', '14325-1264022-1', 'bari', 'none', 314876523, 'phase-1', 'karachi', 'pakistan', '2001-02-06'),
(4, 'uzair@gmail.com', '$2b$12$w39zfuKi9SM/waaNoID4KOvzoW.f0W4t5ro6BPdOfHWHlyWi72dfK', '12325-1264022-1', 'uzair', 'none', 314876523, 'phase-1', 'karachi', 'pakistan', '2001-02-06'),
(5, 'arsam@gmail.com', '$2b$12$y0Db0U2Sox5I5TJAmR7HA.cyeuErdt/ZCWwng1yrKDlAg2oTKjXW.', '42000-123457-1', 'arsam', 'hdjd', 2147483647, 'hdhd', 'jddhh', 'dje', '2001-12-03'),
(6, 'tyfd', '$2b$12$AtVLhcrnfIXpRmdowrM1euhMklNbi0SnfKfAbfQoHpev.U/28Pft2', '', '', '', 0, '', '', '', '0000-00-00'),
(38, 'asad55@gmail.com ', '$2b$12$9edmGQIhmqzJdU.RbvdKkuAUljcN7oXWGUVFCA3aj3Y1L/49OIMwm', '4200', 'agagag', 'agahah', 171717, 'ahaha', 'agga', 'aahah2', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `user_item`
--

CREATE TABLE `user_item` (
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_item`
--

INSERT INTO `user_item` (`user_id`, `item_id`) VALUES
(1, 1),
(1, 19),
(1, 20),
(1, 30),
(1, 31),
(1, 32),
(3, 22),
(3, 23);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cate_id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chat_id`),
  ADD UNIQUE KEY `fk_user_r` (`recvier_id`),
  ADD KEY `fk_user_s` (`sender_id`);

--
-- Indexes for table `contract`
--
ALTER TABLE `contract`
  ADD PRIMARY KEY (`contract_id`),
  ADD UNIQUE KEY `fk_user_c` (`consumer_id`),
  ADD KEY `fk_rating_id` (`rating_id`),
  ADD KEY `fk_item_id` (`item_id`),
  ADD KEY `fk_user_p` (`provider_id`) USING BTREE;

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `fk_cate_id` (`cate_id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`rating_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `cnic` (`cnic`);

--
-- Indexes for table `user_item`
--
ALTER TABLE `user_item`
  ADD UNIQUE KEY `fk_item` (`item_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `cate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contract`
--
ALTER TABLE `contract`
  MODIFY `contract_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `fk_user_r` FOREIGN KEY (`recvier_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `fk_user_s` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `contract`
--
ALTER TABLE `contract`
  ADD CONSTRAINT `fk_item` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`),
  ADD CONSTRAINT `fk_rating_id` FOREIGN KEY (`rating_id`) REFERENCES `rating` (`rating_id`),
  ADD CONSTRAINT `fk_user_c` FOREIGN KEY (`consumer_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `fk_user_p` FOREIGN KEY (`provider_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `fk_cate_id` FOREIGN KEY (`cate_id`) REFERENCES `category` (`cate_id`);

--
-- Constraints for table `user_item`
--
ALTER TABLE `user_item`
  ADD CONSTRAINT `fk_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
