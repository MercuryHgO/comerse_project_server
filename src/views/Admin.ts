import {Router} from "express";
import bodyParser from "body-parser";
import {AdminController} from "../controllers/Admin/admin.controller.js";

const router: Router = Router()

router.use(bodyParser.json())

router.get("/signup",
	async (req, res, next) => {
		try {
			const {login, password}: { login?: string, password?: string } = req.query
			console.log("start")
			
			if (!login || !password) {
				res.sendStatus(400)
				return
			}
			
			const Admin: AdminController = new AdminController()
			
			console.log("start register")
			await Admin.registerAdmin({login: login, password: password})
			console.log("end register")
			
			
			res.sendStatus(200)
			
			console.log("end")
			return
		} catch (e) {
			next(e)
		}
	}
)

router.get('/signin',async (req, res, next) => {
	try {
		const Access = req.get('AccessToken')
		const Refresh = req.get('RefreshToken')
		
		const Admin: AdminController = new AdminController()
		
		if (!!Access) {
			const data = await Admin.authorizeAdminByAccess(Access)
			
			res.send({id: data.id})
			
			return
		}
		
		if (!!Refresh) {
			const tokens = await Admin.updateTokens(Refresh)
			
			res.send(tokens)
			
			return
		}
		
		const {login, password}: {
			login?: string,
			password?: string
		} = req.query
		
		const accessToken = await Admin.authorizeAdmin({login: login, password: password})
		
		res.send(accessToken)
		
		return
	} catch (e) {
		next(e)
	}
})

router.get('/',(req, res) => {
	res.send("alhnfcamjydfgdqIUKD")
})

export default router