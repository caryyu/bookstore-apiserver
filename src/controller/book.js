// Managed by Awilix 
class BookController {
  constructor({knex}) {
    this.knex = knex;
  }

  async getBooks() {
    let books = await this.knex.select().from('books');
    return books;
  }

  async createBook({input}) {
    let {title, author, price} = input;
    let result = await this.knex('books').insert({title, author, price}).returning('*');
    return result.length > 0 && result[0];
  }

  async updateBook({id, input}) {
    let {title, author, price} = input;
    let result = await this.knex('books').where({id}).update({title, author, price}).returning('*');
    return result.length > 0 && result[0];
  }

  async deleteBook({id}) {
    let result = await this.knex('books').where({id}).del();
    return result > 0;
  }
}

module.exports = BookController;

