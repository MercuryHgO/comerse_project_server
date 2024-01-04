import {Product as ProductDatabaseType} from "@prisma/client";
import UserModel from "../../models/user/user.model.js";
import {AdminModel} from "../../models/user/admin.model.js";
import {ProductsModel} from "../../models/products/products.model.js";

export class ProductsController {
	private User: UserModel = new UserModel()
	private Admin: AdminModel = new AdminModel()
	
	private Products: ProductsModel = new ProductsModel()
	
	async getProducts(options: {
		id?: string,
		name?: string,
		price?: number,
		info?: string,
		take?: number
	}): Promise<ProductDatabaseType[]> {
		this.Products.get(options)
		
		const data = await this.Products.execute()
		
		return data[0]
	}
	
	async createProducts(products: {
		name: string,
		price: number,
		info: string
	}[],adminToken: string): Promise<ProductDatabaseType[]> {
		await this.Admin.getAuthorizationMethods().verifyAccess(adminToken)
		
		products.forEach(
			product => this.Products.post(product)
		)

		return await this.Products.execute()
	}
	
	async patchProducts(products: {
		id: string,
		name?: string,
		price?: number,
		info?: string
	}[], adminToken: string): Promise<ProductDatabaseType[]> {
		await this.Admin.getAuthorizationMethods().verifyAccess(adminToken)
		
		products.forEach(
			product => this.Products.patch(product)
		)
		
		return await this.Products.execute()
	}
	
	async deleteProducts(products: {
		id: string
	}[], adminToken: string): Promise<any> {
		await this.Admin.getAuthorizationMethods().verifyAccess(adminToken)
		
		products.forEach(
			product => this.Products.delete(product)
		)
		
		return await this.Products.execute()
	}
}