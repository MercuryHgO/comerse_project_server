import express from "express"
import bodyParser from "body-parser";

import User from "./views/User.js"

const APP_ID = process.env.APP_ID!
const app = express()



app.use(bodyParser.json())

app.use('/user',User)

app.listen(APP_ID, () => console.log(`databaseController is listening on ${APP_ID}`))