const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const PROFILE_TABLE = 'profiles';

const ProfileModel = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  firstName: {
    allowNull: false,
    field: 'first_name',
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    field: 'last_name',
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  location: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  image: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  banner: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  portfolio: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    field: 'is_active',
    defaultValue: true,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    references: { model: USER_TABLE, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

class Profile extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROFILE_TABLE,
      modelName: 'Profile',
      timestamps: false,
    };
  }
}

module.exports = { Profile, ProfileModel, PROFILE_TABLE };
