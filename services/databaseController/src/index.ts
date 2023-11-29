import express from "express"
const APP_ID = process.env.APP_ID
const app = express()

app.get('/',
	(req,res) => {
		res.send(`${APP_ID} database`)
	}
)

app.listen(APP_ID, () => console.log(`databaseController is listening on ${APP_ID}`))