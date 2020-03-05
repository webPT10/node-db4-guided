exports.up = async function(knex) {
	await knex.schema.createTable("zoos", (table) => {
		table.increments("id")
		table.text("name").notNull()
		table.text("address").notNull().unique()
	})

	await knex.schema.createTable("species", (table) => {
		table.increments("id")
		table.text("name").notNull().unique()
	})

	await knex.schema.createTable("animals", (table) => {
		table.increments("id")
		table.text("name").notNull()
		table.integer("species_id")
			.references("id")
			.inTable("species")
			// with these reference options, any time the row we're pointing to with
			// the foreign key gets updated or deleted, those operations will happen
			// on this row too. So if the referenced row gets deleted, this row gets
			// deleted as well. Prevents data anomanlies, or foreign keys pointing to
			// rows that don't exist.
			.onUpdate("CASCADE")
			.onDelete("CASCADE")
	})

	await knex.schema.createTable("zoos_animals", (table) => {
		table.integer("zoo_id")
			.references("id")
			.inTable("zoos")
			.onUpdate("CASCADE")
			.onDelete("CASCADE")
		table.integer("animal_id")
			.references("id")
			.inTable("animals")
			.onUpdate("CASCADE")
			.onDelete("CASCADE")
		table.date("from_date")
		table.date("to_date")
		// since this table doesn't need an ID column, we can make
		// the primary key a combination of two columns.
		table.primary(["zoo_id", "animal_id"])
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("zoos_animals")
	await knex.schema.dropTableIfExists("animals")
	await knex.schema.dropTableIfExists("species")
	await knex.schema.dropTableIfExists("zoos")
}
