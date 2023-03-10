const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const UserModel = {
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
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.ENUM(USER_ROLES.ADMIN, USER_ROLES.USER),
    defaultValue: USER_ROLES.USER
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

module.exports = { USER_TABLE, UserModel, User, USER_ROLES };
