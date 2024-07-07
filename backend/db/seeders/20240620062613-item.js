'use strict';

const { Item } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define the schema in options object
}

const demoItems = [
  {
    storeId: 1,
    name: 'Dragon Armor',
    description: 'Armor made from dragon scales, provides superior protection.',
    price: 300.00,
    quantity: 5,
    category: 'armor'
  },
  {
    storeId: 1,
    name: 'Mana Potion',
    description: 'Restores 30 MP.',
    price: 8.00,
    quantity: 200,
    category: 'potion'
  },
  {
    storeId: 1,
    name: 'Healing Herb',
    description: 'A herb that restores health when consumed.',
    price: 5.00,
    quantity: 50,
    category: 'food'
  },
  {
    storeId: 2,
    name: 'Magic Sword',
    description: 'A powerful sword imbued with magical properties.',
    price: 150.00,
    quantity: 10,
    category: 'weapon'
  },
  {
    storeId: 2,
    name: 'Health Potion',
    description: 'Restores 50 HP.',
    price: 10.00,
    quantity: 100,
    category: 'potion'
  },
  {
    storeId: 2,
    name: 'Shield of Valor',
    description: 'Provides excellent defense against all attacks.',
    price: 120.00,
    quantity: 15,
    category: 'armor'
  },
  {
    storeId: 3,
    name: 'Elven Bow',
    description: 'A bow crafted by elves, known for its precision and power.',
    price: 200.00,
    quantity: 20,
    category: 'weapon'
  },
  {
    storeId: 3,
    name: 'Phoenix Feather',
    description: 'A rare feather with magical healing properties.',
    price: 500.00,
    quantity: 2,
    category: 'accessory'
  },
  {
    storeId: 3,
    name: 'Enchanted Cloak',
    description: 'A cloak that provides invisibility for a short period.',
    price: 250.00,
    quantity: 7,
    category: 'armor'
  },
  {
    storeId: 4,
    name: 'Mystic Ring',
    description: 'A ring that enhances magical abilities.',
    price: 400.00,
    quantity: 5,
    category: 'accessory'
  },
  {
    storeId: 4,
    name: 'Iron Hammer',
    description: 'A tool used for crafting and repair.',
    price: 30.00,
    quantity: 25,
    category: 'tool'
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
    await Item.bulkCreate(demoItems, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {}); // queryInterface.bulkDelete(modelName, where, options)
     */
    options.tableName = 'Items';
    return queryInterface.bulkDelete(options, null, {});
  }
};
