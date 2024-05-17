const { Book } = require('../models');

class BookRepository {
  async create(data) {
    return Book.create(data);
  }

  async findAll() {
    return Book.findAll();
  }

  async findById(id) {
    return Book.findByPk(id);
  }

  async update(id, data) {
    const [updated] = await Book.update(data, { where: { id } });
    if (updated) {
      return this.findById(id);
    }
    return null;
  }

  async delete(id) {
    return Book.destroy({ where: { id } });
  }
}

module.exports = new BookRepository();
