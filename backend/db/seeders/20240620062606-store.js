'use strict';

const { Store } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define the schema in options object
}

const demoStores = [
  {
    ownerId: 1,
    name: 'Epic Games Store',
    description: 'Your ultimate destination for the latest and greatest games.',
    location: 'New York, NY'
  },
  {
    ownerId: 2,
    name: 'Gamer\'s Paradise',
    description: 'A paradise for all gamers, featuring a wide range of games and accessories.',
    location: 'Los Angeles, CA'
  },
  {
    ownerId: 3,
    name: 'Tech Savvy Store',
    description: 'The best tech products and gadgets for every gamer.',
    location: 'San Francisco, CA'
  },
  {
    ownerId: 4,
    name: 'Fantasy World',
    description: 'Dive into the world of fantasy with our curated selection of games.',
    location: 'Seattle, WA'
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Store.bulkCreate(demoStores, { validate: true });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {}); // queryInterface.bulkDelete(modelName, where, options)
     */
    options.tableName = 'Stores';
    return queryInterface.bulkDelete(options, null, {});
  }
};
