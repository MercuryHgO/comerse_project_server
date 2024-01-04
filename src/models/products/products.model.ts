import {databaseEndpointsModel} from "../databaseEndpoints/databaseEndpoints.model.js";
import prisma from "../helpers/prisma.js";

export class ProductsModel extends databaseEndpointsModel {
	get(data: {
		id?: string,
		name?: string,
		price?: number,
		info?: string
	}): void {
		
		const request = prisma.product.findMany({
			where: {
				OR: [
					{ id: data.id },
					{ name: data.name },
					{ price: data.price },
					{ info: data.info }
				]
			}
		})
		
		this.requestsStack.push(request)
	}
	
	post(data: {
		name: string,
		price: number,
		info: string
	}): void {
		const request = prisma.product.create({data: data})
		
		this.requestsStack.push(request)
	}
	
	patch(data: {
		id: string,
		name?: string,
		price?: number,
		info?: string
	}): void {
		const request = prisma.product.update({
			where: {
				id: data.id
			},
			data: data
		})
		
		this.requestsStack.push(request)
	}
	
	delete(data: {
		id: string
	}): void {
		const request = prisma.product.delete({
			where: {
				id: data.id
			}
		})
	}
}