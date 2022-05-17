// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: '/tmp/book_store.sqlite'
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'book_store',
      user:     'postgres',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
