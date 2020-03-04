const express = require("express")
const helmet = require("helmet")
const zoosRouter = require("./zoos/zoos-router")
const animalsRouter = require("./animals/animals-router")
const speciesRouter = require("./species/species-router")

const server = express()
const port = process.env.PORT || 4000

server.use(helmet())
server.use(express.json())

server.use("/zoos", zoosRouter)
server.use("/animals", animalsRouter)
server.use("/species", speciesRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
