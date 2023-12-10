import express from "express"
import bodyParser from "body-parser";

import User from "./views/User.js"
import Admin from "./views/Admin.js"
import Products from "./views/Products.js"

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

import {config} from "dotenv"

config()

const APP_ID = process.env.APP_ID!
const app = express()



app.use(bodyParser.json())

app.use("/admin",Admin)
app.use("/user",User)
app.use("/products",Products)

app.use(
	(err, req, res: express.Response, next) => {
		if(err instanceof PrismaClientKnownRequestError) {
			switch (err.code) {
				case "P2002":
					res.status(400).send("User with the same " + err.meta.target[0] + " already exits")
					break
				default:
					console.error(err)
					res.status(500).send("Server error")
					break
			}
		}
		
		switch (err.message) {
			default:
				console.error(err)
				res.status(500).send("Server error")
				break
		}
    }
)

app.listen(APP_ID, () => console.log(`databaseController is listening on ${APP_ID}`))