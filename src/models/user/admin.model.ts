import {databaseEndpointsModel} from "../databaseEndpoints/databaseEndpoints.model.js";
import {AdminJWTModel} from "../jsonWebToken/jsowWebTokenAccessRefresh.model.js";
import prisma from "../helpers/prisma.js";

export class AdminModel extends databaseEndpointsModel {
	getAuthorizationMethods(): AdminJWTModel {
		return new AdminJWTModel()
	}
	
	get(
		options: {
			id?: string,
			login?: string,
			password?: string
		}
	) {
		const request = prisma.admin.findMany({
			where: {
				OR: [
					{id: options.id},
					{login: options.login},
					{password: options.password}
				]
			}
		})
		
		this.requestsStack.push(request)
	}
	
	post(data: {
		login: string,
		password: string
	}) {
		const request = prisma.admin.create({
			data: data
		})
		
		this.requestsStack.push(request)
	}
	
	patch(
		data: {
			id: string,
			login?: string,
			password?: string
		}
	) {
		const request = prisma.admin.update({
			where: {
				id: data.id
			},
			data: data
		})
		
		this.requestsStack.push(request)
	}
	
	delete(
		data: {
			id: string
		}
	) {
		const request = prisma.admin.delete({
			where: data
		})
		
		this.requestsStack.push(request)
	}
}