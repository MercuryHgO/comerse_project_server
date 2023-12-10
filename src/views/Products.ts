import {Router} from "express";
import bodyParser from "body-parser";
import {ProductsController} from "../controllers/Products/products.controller.js";

const router: Router = Router()

router.use(bodyParser.json())

router.get("/search",
	async (req, res, next) => {
		try {
			const {name, price}: { name?: string, price?: number } = req.query
			
			if (!name && !price) {
				res.sendStatus(400)
				return
			}
			
			const Products: ProductsController = new ProductsController()
			
			const product = await Products.getProducts({name: name, price: price})
			
			!!product[0] ? res.send(product) : res.status(404).send('No product found')
			
			return
		} catch (e) {
			next(e)
		}
	}
)

router.get("/:id",
	async (req, res, next) => {
		try {
			const Products: ProductsController = new ProductsController()
			
			const product = await Products.getProducts({id: req.params.id})
			
			!!product[0] ? res.send(product[0]) : res.status(404).send('No product found')
			
			return
		} catch (e) {
			next(e)
		}
	}
)

router.post("/",
	async (req, res, next) => {
		try {
			const Access = req.get('AccessToken')
			
			const data: {
				name: string,
				price: number,
				info: string
			}[] = req.body
			
			const Products: ProductsController = new ProductsController()
			
			const products = await Products.createProducts(data, Access)
			
			res.send(products)
			
			return
		} catch (e) {
			next(e)
		}
	}
)

router.patch("/",
	async (req, res, next) => {
		try {
			const Access = req.get('AccessToken')
			
			const data: {
				id: string,
				name?: string,
				price?: number,
				info?: string
			}[] = req.body
			
			const Products: ProductsController = new ProductsController()
			
			const products = await Products.patchProducts(data, Access)
			
			res.send(products)
			
			return
		} catch (e) {
			next(e)
		}
	}
)

router.delete("/",
	async (req, res, next) => {
		try {
			const Access = req.get('AccessToken')
			
			const data: {
				id: string
			}[] = req.body
			
			const Products: ProductsController = new ProductsController()
			
			const products = await Products.deleteProducts(data, Access)
			
			res.send(products)
			
			return
		} catch (e) {
			next(e)
		}
	}
)

export default router