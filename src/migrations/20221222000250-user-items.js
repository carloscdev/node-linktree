'use strict';

const { ItemModel, ITEM_TABLE } = require('../models/item.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ITEM_TABLE, ItemModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ITEM_TABLE);
  }
};
