import express from "express"

const APP_ID = process.env.APP_ID!
const app = express()

app.get('/',
	(req, res) => {
		res.send('rest api is working')
	}
)

app.listen(APP_ID, () => console.log(`restController listening on ${APP_ID}`))