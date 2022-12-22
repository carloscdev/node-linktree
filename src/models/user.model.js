const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserModel = {
  // id: {
  //   allowNull: false,
  //   primaryKey: true,
  //   type: Sequelize.UUID,
  //   defaultValue: Sequelize.UUIDV4,
  // },
  id: {
    allowNull: false,
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Profile, {
      as: 'profile',
      foreignKey: 'userId',
    });
    this.hasMany(models.Item, {
      as: 'item',
      foreignKey: 'userId',
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserModel, User };
