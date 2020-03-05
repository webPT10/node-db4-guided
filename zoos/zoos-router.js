const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.json(await db("zoos"))
	} catch(err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const zoo = await db("zoos")
			.where("id", req.params.id)
			.first()
		
		if (!zoo) {
			return res.status(404).json({
				message: "Zoo not found",
			})
		}

		res.json(zoo)
	} catch(err) {
		next(err)
	}
})

router.get("/:id/animals", async (req, res, next) => {
	try {
		// we're essentially creating a result from four different tables in a single
		// query. we have to go through an intermediary table in this case, to determine
		// which animals are associated with this zoo. it's a many-to-many relationship.
		const animals = await db("zoos_animals as za")
			.join("zoos as z", "z.id", "za.zoo_id")
			.join("animals as a", "a.id", "za.animal_id")
			.join("species as s", "s.id", "a.species_id")
			.where("z.id", req.params.id)
			.select("a.*", "s.name as species_name", "za.from_date", "za.to_date")

		res.json(animals)
	} catch(err) {
		next(err)
	}
})

module.exports = router