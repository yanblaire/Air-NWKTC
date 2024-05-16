-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 16, 2024 at 07:11 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `AirNWKTC_Database`
--

-- --------------------------------------------------------

--
-- Table structure for table `Booking`
--

CREATE TABLE `Booking` (
  `BookingID` int NOT NULL,
  `RoomID` int NOT NULL,
  `InstructorUserID` int NOT NULL,
  `Course` varchar(100) NOT NULL,
  `BookingStartTime` datetime NOT NULL,
  `BookingEndTime` datetime NOT NULL,
  `BookingDuration` time NOT NULL,
  `Status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Booking`
--

INSERT INTO `Booking` (`BookingID`, `RoomID`, `InstructorUserID`, `Course`, `BookingStartTime`, `BookingEndTime`, `BookingDuration`, `Status`) VALUES
(30, 355, 5, 'Topside Client Meeting', '2024-05-15 23:06:00', '2024-05-15 23:06:00', '00:00:00', 'Confirmed'),
(32, 368, 9, 'Pool Tournament', '2024-05-15 23:00:00', '2024-05-15 23:00:00', '00:00:00', 'Confirmed'),
(33, 375, 5, 'Computer Fundamentals', '2024-05-15 23:47:39', '2024-05-15 23:47:39', '00:00:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `Room`
--

CREATE TABLE `Room` (
  `RoomID` int NOT NULL,
  `RoomName` varchar(300) NOT NULL,
  `Capacity` int NOT NULL,
  `Availability` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Room`
--

INSERT INTO `Room` (`RoomID`, `RoomName`, `Capacity`, `Availability`) VALUES
(355, 'Meeting Room', 25, 0),
(368, '2nd Year Room', 23, 0),
(369, 'English Room', 234, 1),
(370, 'CGT Room', 43, 1),
(372, 'Test 2', 34, 1),
(373, 'Electrical', 54, 1),
(374, '1st Year Room', 56, 0),
(375, 'Computer Room', 23, 0),
(377, 'Comfort Room', 1, 1),
(378, 'Testing Room', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `UserID` int NOT NULL,
  `FirstName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Role` varchar(50) NOT NULL,
  `EthAddress` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`UserID`, `FirstName`, `LastName`, `Password`, `Email`, `Role`, `EthAddress`) VALUES
(5, 'Omar', 'Lopez', 'password', 'omarlopez@nwktc.edu', 'instructor', '0x20f53c1cB6Cc4785465488999C94d46D1130E193'),
(9, 'Marco', 'Polo', 'password', 'shoutit@nwktc.edu', 'instructor', 'x3aEaC3E1644A6678421ee196FE4200b91E5844B5'),
(10, 'Westy', 'Bestie', 'password', 'westy@nwktc.edu', 'instructor', '0x3Ab037146909231678E4349e0D9D977983152e61'),
(11, 'Yan Blaire', 'Dologuin', 'password', 'yandologuin@nwktc.edu', 'administrator', '0x5f5Ff9B4334A54a072d1D263C30AB4cA2a06dca6'),
(12, 'Jeremy', 'Skrdlant', 'password', 'jeremyskrdlant@nwktc.edu', 'administrator', '0xA0035DA436D6EEe2E1963fdF979fe2122D6d302b'),
(13, 'Isaac', 'Guy', 'password', 'isaac@nwktc.edu', 'instructor', '0x39C4319e1a96592d985aa391733f71a063eB883C'),
(21, 'Hello', 'World', 'password', 'helloworld@nwktc.edu', 'instructor', '0x5016fF8463137bCb590590A3c798446D11B7DdD2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Booking`
--
ALTER TABLE `Booking`
  ADD PRIMARY KEY (`BookingID`);

--
-- Indexes for table `Room`
--
ALTER TABLE `Room`
  ADD PRIMARY KEY (`RoomID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Booking`
--
ALTER TABLE `Booking`
  MODIFY `BookingID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `Room`
--
ALTER TABLE `Room`
  MODIFY `RoomID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=379;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
