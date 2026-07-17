'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('Flights', [
      // Bengaluru (BLR) → Delhi (DEL)
      {
        flightNumber: 'PN201',
        airplaneId: 1,
        departureAirportId: 29,
        arrivalAirportId: 32,
        departureTime: new Date('2024-12-02T06:00:00Z'),
        arrivalTime:   new Date('2024-12-02T09:00:00Z'),
        price: 3600,
        totalSeats: 180,
        createdAt: now,
        updatedAt: now,
      },
      // Bengaluru (BLR) → Varanasi (VNS)
      {
        flightNumber: 'PN202',
        airplaneId: 1,
        departureAirportId: 29,
        arrivalAirportId: 35,
        departureTime: new Date('2024-12-02T07:30:00Z'),
        arrivalTime:   new Date('2024-12-02T10:30:00Z'),
        price: 2800,
        totalSeats: 180,
        createdAt: now,
        updatedAt: now,
      },
      // Delhi (DEL) → Bengaluru (BLR)
      {
        flightNumber: 'PN203',
        airplaneId: 1,
        departureAirportId: 32,
        arrivalAirportId: 29,
        departureTime: new Date('2024-12-02T11:00:00Z'),
        arrivalTime:   new Date('2024-12-02T14:00:00Z'),
        price: 3400,
        totalSeats: 180,
        createdAt: now,
        updatedAt: now,
      },
      // Mangaluru (IXE) → Delhi (DEL)
      {
        flightNumber: 'PN204',
        airplaneId: 1,
        departureAirportId: 30,
        arrivalAirportId: 32,
        departureTime: new Date('2024-12-02T08:45:00Z'),
        arrivalTime:   new Date('2024-12-02T11:45:00Z'),
        price: 3100,
        totalSeats: 180,
        createdAt: now,
        updatedAt: now,
      },
      // Delhi (DEL) → Varanasi (VNS)
      {
        flightNumber: 'PN205',
        airplaneId: 1,
        departureAirportId: 32,
        arrivalAirportId: 35,
        departureTime: new Date('2024-12-02T15:30:00Z'),
        arrivalTime:   new Date('2024-12-02T18:00:00Z'),
        price: 2600,
        totalSeats: 180,
        createdAt: now,
        updatedAt: now,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', {
      flightNumber: { [Sequelize.Op.in]: ['PN201','PN202','PN203','PN204','PN205'] }
    }, {});
  }
};
