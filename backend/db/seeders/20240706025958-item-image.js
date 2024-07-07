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
    url: 'https://i.imghippo.com/files/MmbZZ1720152675.jpg'
  },
  {
    itemId: 3,
    url: 'https://i.imghippo.com/files/MmbZZ1720152675.jpg'
  },
  {
    itemId: 4,
    url: 'https://i.imghippo.com/files/MmbZZ1720152675.jpg'
  },
  {
    itemId: 5,
    url: 'https://i.imghippo.com/files/MmbZZ1720152675.jpg'
  },
  {
    itemId: 6,
    url: 'https://i.imghippo.com/files/MmbZZ1720152675.jpg'
  },
  {
    itemId: 7,
    url: 'https://i.imghippo.com/files/MmbZZ1720152675.jpg'
  },
  {
    itemId: 8,
    url: 'https://i.imghippo.com/files/MmbZZ1720152675.jpg'
  },
  {
    itemId: 9,
    url: 'https://i.imghippo.com/files/MmbZZ1720152675.jpg'
  },
  {
    itemId: 10,
    url: 'https://i.imghippo.com/files/MmbZZ1720152675.jpg'
  },
  {
    itemId: 11,
    url: 'https://i.imghippo.com/files/MmbZZ1720152675.jpg'
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
