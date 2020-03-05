
exports.up = async function(knex) {
  await knex.schema.createTable("zoos", (table) => {
    table.increments("id")
    table.string("name").notNull()
    table.string("address").notNull().unique()
  })

};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("zoos")
  await knex.schema.dropTableIfExists("animals")
};
