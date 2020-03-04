exports.seed = async function(knex) {
	await knex("zoos_animals").truncate()
	await knex("animals").truncate()
	await knex("species").truncate()
	await knex("zoos").truncate()
}