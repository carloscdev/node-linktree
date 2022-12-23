const { Model, DataTypes } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const ITEM_TABLE = 'items';

const ITEM_TYPES = {
  LINK: 'LINK',
  HEAD: 'HEAD'
}

const ItemModel = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(ITEM_TYPES.LINK, ITEM_TYPES.HEAD),
    allowNull: false,
    defaultValue: ITEM_TYPES.LINK,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Item extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ITEM_TABLE,
      modelName: 'Item',
      timestamps: false,
    };
  }
}

module.exports = { Item, ItemModel, ITEM_TABLE, ITEM_TYPES };
