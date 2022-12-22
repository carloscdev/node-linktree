const boom = require('@hapi/boom');

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

  async create(data) {
    const user = await models.User.create(data);
    return user;
  }

  async updatePassword(id, data) {
    if (data.password !== data.confirmPassword)
      throw boom.badRequest('Las contraseñas no coinciden');
    await models.User.update({ password: data.password }, { where: { id } });
  }
}

module.exports = UserService;
