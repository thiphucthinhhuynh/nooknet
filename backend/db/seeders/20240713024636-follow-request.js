'use strict';

const { FollowRequest } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoFollowRequests = [
  {
    senderId: 1,
    receiverId: 3
  },
  {
    senderId: 1,
    receiverId: 4
  },
  {
    senderId: 2,
    receiverId: 1
  },
  {
    senderId: 2,
    receiverId: 4
  },
  {
    senderId: 4,
    receiverId: 3
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
    await FollowRequest.bulkCreate(demoFollowRequests, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {}); // queryInterface.bulkDelete(modelName, where, options)
     */
    options.tableName = 'FollowRequests';
    return queryInterface.bulkDelete(options, null, {});
  }
};
