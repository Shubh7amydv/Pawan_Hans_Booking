// City seeder for Flight service (ABP)
// This seeds the Cities table with basic city entries referenced by the airport seeder.
// Adjust IDs as needed to match foreign keys in airports.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cities', [
      { id: 20, name: 'Bengaluru', state: 'Karnataka', country: 'India', createdAt: new Date(), updatedAt: new Date() },
      { id: 21, name: 'Mangalore', state: 'Karnataka', country: 'India', createdAt: new Date(), updatedAt: new Date() },
      { id: 22, name: 'Belagavi', state: 'Karnataka', country: 'India', createdAt: new Date(), updatedAt: new Date() },
      { id: 23, name: 'New Delhi', state: 'Delhi', country: 'India', createdAt: new Date(), updatedAt: new Date() },
      { id: 24, name: 'Varanasi', state: 'Uttar Pradesh', country: 'India', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', {
      id: { [Sequelize.Op.in]: [20, 21, 22, 23, 24] }
    }, {});
  }
};
