import {request, Router} from "express";
import {AdminController} from "../controllers/User/user.controller.js";
import bodyParser from "body-parser";

const router: Router = Router()

router.use(bodyParser.json())

router.get('/signin',async (req, res, next) => {
	try {
		const Access = req.get('AccessToken')
		const Refresh = req.get('RefreshToken')
		
		const User: AdminController = new AdminController()
		
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
		
		const accessToken = await User.authorizeUser(login, password)
		
		res.send(accessToken)
		
		return
	} catch (e) {
		next(e)
	}
})

router.get('/signup',async (req, res, next) => {
	try {
		const User: AdminController = new AdminController()
		
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
		)
		
		res.sendStatus(200)
		
		return
	} catch (e) {
		console.error("Error catched")
		next(e)
	}
})

router.get('/',(req, res) => {
	res.send("alhnfcamjydfgdqIUKD")
})

export default router