'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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

    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'demo_user',
        hashedPassword: bcrypt.hashSync('password'),
        profilePic: 'https://i.imghippo.com/files/nx94B1720077160.png'
      },
      {
        email: 'lily@user.io',
        username: 'lily',
        hashedPassword: bcrypt.hashSync('password'),
        profilePic: 'https://i.imghippo.com/files/FNCVC1720385889.jpg'
      },
      {
        email: 'winter@user.io',
        username: 'winter',
        hashedPassword: bcrypt.hashSync('password'),
        profilePic: 'https://i.imghippo.com/files/nQm7E1720340410.png'
      },
      {
        email: 'yuru@user.io',
        username: 'yuru',
        hashedPassword: bcrypt.hashSync('password'),
        profilePic: 'https://i.imghippo.com/files/JHl8L1720340351.png'
      }
    ], { validate: true });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});

  }
};
