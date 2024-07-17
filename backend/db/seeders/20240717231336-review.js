'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define the schema in options object
}

const demoReviews = [
  {
    userId: 1,
    storeId: 3,
    body: "Great selection of weapons! The quality is top-notch and the prices are reasonable.",
    stars: 5,
  },
  {
    userId: 1,
    storeId: 4,
    body: "Bought a sword and it broke after a few uses. Not happy with the purchase.",
    stars: 2,
  },
  {
    userId: 2,
    storeId: 1,
    body: "Amazing potions that really boosted my health and defense. Will buy again!",
    stars: 4,
  },
  {
    userId: 2,
    storeId: 4,
    body: "The potions are good but a bit overpriced. Still, the quality is undeniable.",
    stars: 3,
  },
  {
    userId: 3,
    storeId: 1,
    body: "Fantastic store! The food items restored my HP quickly and tasted great too!",
    stars: 5,
  },
  {
    userId: 3,
    storeId: 2,
    body: "The food items are good, but they were delivered late. Could improve on service.",
    stars: 3,
  },
  {
    userId: 4,
    storeId: 1,
    body: "Bought a shield that greatly improved my defense. Worth every coin!",
    stars: 5,
  },
  {
    userId: 4,
    storeId: 3,
    body: "The defense items are effective, but the store lacks variety. Hope to see more options soon.",
    stars: 4,
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
    await Review.bulkCreate(demoReviews, { validate: true });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {}); // queryInterface.bulkDelete(modelName, where, options)
     */
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, null, {});
  }
};
