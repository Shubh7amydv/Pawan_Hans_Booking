'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Insert 20 cities matching the cityId values used by the airport seeder
    const cities = [];
    for (let i = 1; i <= 20; i++) {
      cities.push({
        id: i,
        name: `City ${i}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Cities', cities, {});
  },

  async down (queryInterface, Sequelize) {
    // Delete the seeded cities
    await queryInterface.bulkDelete('Cities', { id: { [Sequelize.Op.in]: Array.from({ length: 20 }, (_, i) => i + 1) } }, {});
  }
};
