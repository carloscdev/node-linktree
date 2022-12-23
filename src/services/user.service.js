const boom = require('@hapi/boom');
const { encryptPassword } = require('../utils/bcrypt.util');

const { sequelize } = require('../config/database');
const { models } = sequelize;

class UserService {
  async findAll() {
    const userList = await models.User.findAll({
      where: { isActive: true },
      include: ['profile'],
    });
    const userFormatList = userList.filter(
      (user) => user.profile && user.profile.isActive
    );
    const result = userFormatList.map(({ profile }) => {
      return {
        name: `${profile.firstName} ${profile.lastName}`,
        phone: profile.phone,
        location: profile.location,
        image: profile.image,
        userId: profile.userId,
      };
    });
    return result;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['profile', 'item'],
      order: [['item', 'position', 'ASC']],
      attributes: {
        exclude: ['password', 'createdAt'],
      },
    });
    if (!user || !user.isActive || !user.profile || !user.profile.isActive)
      throw boom.notFound('Usuario no encontrado');

    return user;
  }

  async findByEmail(email) {
    const user =  await models.User.findOne({
      where: { email }
    });
    return user;
  }

  async create(data) {
    const password = await encryptPassword(data.password);
    const user = await models.User.create({
      ...data,
      password
    });
    delete user.dataValues['password'];
    return user;
  }

  async updatePassword(id, data) {
    if (data.password !== data.confirmPassword)
      throw boom.badRequest('Las contraseñas no coinciden');
    const password = await encryptPassword(data.password);
    await models.User.update({ password }, { where: { id } });
  }
}

module.exports = UserService;
