'use strict';

const { ItemImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define the schema in options object
}

const demoItemImages = [
  {
    itemId: 1,
    url: 'https://i.imghippo.com/files/MmbZZ1720152675.jpg'
  },
  {
    itemId: 2,
    url: 'https://i.imghippo.com/files/1tLQ11720385984.jpg'
  },
  {
    itemId: 3,
    url: 'https://i.imghippo.com/files/bo9691720385994.jpg'
  },
  {
    itemId: 4,
    url: 'https://i.imghippo.com/files/0MM8v1720386051.jpg'
  },
  {
    itemId: 5,
    url: 'https://i.imghippo.com/files/WmJEb1720386653.jpg'
  },
  {
    itemId: 6,
    url: 'https://i.imghippo.com/files/GuZko1720386691.jpg'
  },
  {
    itemId: 7,
    url: 'https://i.imghippo.com/files/e1jZP1720386729.jpg'
  },
  {
    itemId: 8,
    url: 'https://i.imghippo.com/files/QUDdO1720386741.jpg'
  },
  {
    itemId: 9,
    url: 'https://i.imghippo.com/files/SBZhO1720386784.jpg'
  },
  {
    itemId: 10,
    url: 'https://i.imghippo.com/files/HvdZ21720386793.jpg'
  },
  {
    itemId: 11,
    url: 'https://i.imghippo.com/files/NuZnD1720386802.jpg'
  },
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
    await ItemImage.bulkCreate(demoItemImages, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {}); // queryInterface.bulkDelete(modelName, where, options)
     */
    options.tableName = 'ItemImages';
    return queryInterface.bulkDelete(options, null, {});
  }
};
