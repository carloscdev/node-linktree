'use strict';

const { UserModel, USER_TABLE } = require('../models/user.model');
const { ProfileModel, PROFILE_TABLE } = require('../models/profile.model');
const { ItemModel, ITEM_TABLE } = require('../models/item.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, ) {
    await queryInterface.createTable(USER_TABLE, UserModel);
    await queryInterface.createTable(PROFILE_TABLE, ProfileModel);
    await queryInterface.createTable(ITEM_TABLE, ItemModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(PROFILE_TABLE);
    await queryInterface.createTable(ITEM_TABLE, ItemModel);
  }
};
