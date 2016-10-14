require('env2')('./config.env')

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
  },
  debug: true
})

knex.schema.hasTable('photos')
.then((exist) => {
  if (!exist)
    knex.schema.createTable('photos', (table) => {
      table.increments('id')
      table.string('filename')
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
    .then(() => {
      console.log('photos table created')
    })
})

module.exports = knex
