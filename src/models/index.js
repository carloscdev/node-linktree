const { User, UserModel } = require('../models/user.model');
const { Profile, ProfileModel } = require('../models/profile.model');
const { Item, ItemModel } = require('../models/item.model');

function setupModels(sequelize) {
  User.init(UserModel, User.config(sequelize));
  Profile.init(ProfileModel, Profile.config(sequelize));
  Item.init(ItemModel, Item.config(sequelize));

  User.associate(sequelize.models);
  Profile.associate(sequelize.models);
  Item.associate(sequelize.models);
}

module.exports = { setupModels };
