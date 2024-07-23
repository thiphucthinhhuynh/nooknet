'use strict';

const { Like } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define the schema in options object
}

const demoLikes = [
  {
    userId: 1,
    itemId: 1
  },
  {
    userId: 1,
    itemId: 2
  },
  {
    userId: 1,
    itemId: 5
  },
  {
    userId: 2,
    itemId: 1
  },
  {
    userId: 2,
    itemId: 2
  },
  {
    userId: 3,
    itemId: 9
  },
  {
    userId: 3,
    itemId: 10
  },
  {
    userId: 3,
    itemId: 11
  },
  {
    userId: 4,
    itemId: 1
  },
  {
    userId: 4,
    itemId: 5
  },
  {
    userId: 4,
    itemId: 6
  },
  {
    userId: 4,
    itemId: 7
  },
  {
    userId: 4,
    itemId: 8
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
    await Like.bulkCreate(demoLikes, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {}); // queryInterface.bulkDelete(modelName, where, options)
     */
    options.tableName = 'Likes';
    return queryInterface.bulkDelete(options, null, {});
  }
};
