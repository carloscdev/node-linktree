const boom = require('@hapi/boom');
const { sequelize } = require('../config/database');
const { models } = sequelize;

class ItemService {
  async findAll(userId) {
    const itemList = await models.Item.findAll({
      where: { userId },
      order: [
        ['position', 'ASC']
      ]
    });
    return itemList;
  }
  async findOne(id) {
    const item = await models.Item.findByPk(id);
    if (!item) throw boom.notFound('Item no existe');
    return item;
  }

  async create(data) {
    const item = await models.Item.create(data);
    return item;
  }

  async updateOne(id, data) {
    const item = await this.findOne(id);
    if (!item) throw boom.notFound('Item no existe');
    const response = item.update(data);
    return response;
  }

  async deleteOne(id) {
    const item = await this.findOne(id);
    if (!item) throw boom.notFound('Item no encontrado');
    item.destroy();
    return {
      message: 'Item eliminado',
    };
  }
}

module.exports = ItemService;
