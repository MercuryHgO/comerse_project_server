import {request, Router} from "express";
import {UserController} from "../controllers/User/user.controller.js";
import bodyParser from "body-parser";

const router: Router = Router()

router.use(bodyParser.json())

router.get('/signin',async (req, res, next) => {
	const Access = req.get('AccessToken')
	const Refresh = req.get('RefreshToken')
	
	const User: UserController = new UserController()
	
	if (!!Access) {
		const data = await User.authorizeUserByAccess(Access)
		
		res.send({id: data.id, name: data.name})
		
		return
	}
	
	if (!!Refresh) {
		const tokens = await User.updateTokens(Refresh)
		
		res.send(tokens)
		
		return
	}
	
	const {login, password}: {
		login?: string,
		password?: string
	} = req.query
	
	const accessToken = await User.authorizeUser(login,password)
	
	res.send(accessToken)
	
	return
})

router.get('/signup',async (req, res, next) => {
	const User: UserController = new UserController()
	
	const {name, login, password}: {
		name?: string,
		login?: string,
		password?: string
	} = req.query
	
	if (!name || !login || !password) {
		res.sendStatus(400)
		return
	}
	
	await User.registerUser(
		{
			name: name,
			login: login,
			password: password
		}
	)[0]
	
	res.sendStatus(200)
	
	return
})

router.get('/',(req, res) => {
	res.send("alhnfcamjydfgdqIUKD")
})

export default router