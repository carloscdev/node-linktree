const boom = require('@hapi/boom');
const { sequelize } = require('../config/database');
const { models } = sequelize;

class ProfileService {
  async findOne(id) {
    const profile = await models.Profile.findOne({
      where: { userId: id },
      attributes: {
        exclude: ['id', 'userId'],
      },
    });
    if (!profile) throw boom.notFound('Perfil no encontrado');

    return profile;
  }

  async create(data) {
    const profile = await models.Profile.create(data);
    return profile;
  }

  async update(userId, data) {
    await models.Profile.update(
      { ...data },
      {
        where: { userId },
        returning: true,
        plain: true,
        attributes: { exclude: ['id'] },
      }
    );
    return {
      statusCode: 200,
      message: 'Perfil actualzado',
    };
  }
}

module.exports = ProfileService;
