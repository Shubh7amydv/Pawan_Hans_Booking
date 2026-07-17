'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    await queryInterface.bulkInsert('Airports', [
      {
        name:'Kempegowda International Airport',
        cityId:'20',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Menagaluru International Airport',
        cityId:'20',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Belagavi  Airport',
        cityId:'20',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Indira gandhi International Airport',
        cityId:'1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */


    await queryInterface.bulkDelete('Airports', null ,{});
  }
};
