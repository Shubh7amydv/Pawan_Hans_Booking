-- Disable foreign key checks temporarily to safely clear and rebuild
SET FOREIGN_KEY_CHECKS = 0;

-- Truncate tables to get a clean state
TRUNCATE TABLE Flights;
TRUNCATE TABLE Airports;
TRUNCATE TABLE Airplanes;
TRUNCATE TABLE Cities;

-- Enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Insert Cities
INSERT INTO Cities (id, name, createdAt, updatedAt) VALUES
(1, 'Delhi', NOW(), NOW()),
(20, 'Bengaluru', NOW(), NOW()),
(21, 'Mangalore', NOW(), NOW()),
(22, 'Belagavi', NOW(), NOW()),
(23, 'Varanasi', NOW(), NOW());

-- Insert Airports
INSERT INTO Airports (id, name, address, cityId, createdAt, updatedAt) VALUES
(29, 'Kempegowda International Airport', 'Bengaluru, Karnataka', 20, NOW(), NOW()),
(30, 'Menagaluru International Airport', 'Mangaluru, Karnataka', 21, NOW(), NOW()),
(31, 'Belagavi Airport', 'Belagavi, Karnataka', 22, NOW(), NOW()),
(32, 'Indira gandhi International Airport', 'New Delhi, Delhi', 1, NOW(), NOW()),
(35, 'Babatpur Airport', 'Varanasi, Uttar Pradesh', 23, NOW(), NOW());

-- Insert Airplanes
INSERT INTO Airplanes (id, modelNumber, capacity, createdAt, updatedAt) VALUES
(1, 'Airbus A320', 150, NOW(), NOW()),
(2, 'Boeing 737', 180, NOW(), NOW());

-- Insert Flights
INSERT INTO Flights (id, flightNumber, airplaneId, departureAirportId, arrivalAirportId, arrivalTime, departureTime, price, boardingGate, totalSeats, createdAt, updatedAt) VALUES
(1, 'PN201', 1, 29, 32, '2026-12-02 09:00:00', '2026-12-02 06:00:00', 3600, 'Gate A1', 150, NOW(), NOW()),
(2, 'PN202', 1, 29, 35, '2026-12-02 10:30:00', '2026-12-02 07:30:00', 2800, 'Gate A2', 150, NOW(), NOW()),
(3, 'PN203', 1, 32, 29, '2026-12-02 14:00:00', '2026-12-02 11:00:00', 3400, 'Gate B1', 150, NOW(), NOW()),
(4, 'PN204', 1, 30, 32, '2026-12-02 11:45:00', '2026-12-02 08:45:00', 3100, 'Gate C1', 150, NOW(), NOW()),
(5, 'PN205', 1, 32, 35, '2026-12-02 18:00:00', '2026-12-02 15:30:00', 2600, 'Gate D1', 150, NOW(), NOW());
