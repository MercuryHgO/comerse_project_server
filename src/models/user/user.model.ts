import { PrismaPromise } from "@prisma/client";
import prisma from '../helpers/prisma.js'
import {databaseEndpointsModel} from "../databaseEndpoints/databaseEndpoints.model.js";
import {IJWTAccessRefresh} from "../jsonWebToken/jsonWebTokenAccessRefresh.interface.js";
import { UserJWTModel } from "../jsonWebToken/jsowWebTokenAccessRefresh.model.js";

// TODO refactor

export default class UserModel extends databaseEndpointsModel {
	
	getAuthorizationMethods(): IJWTAccessRefresh {
		return new UserJWTModel()
	}
	
	get(options: {
		id?: string,
		name?: string,
		login?: string,
		password?: string,
	}): void {
		const query: PrismaPromise<any> = prisma.user.findMany({
			where: {
				OR: [
					{ id: options.id },
					{ name: options.name },
					{ login: options.login },
					{ password: options.password },
				]
			}
		})
		
		this.requestsStack.push(query)
	}
	
	post(data: {
		name: string,
		login: string,
		password: string,
	}): void {
		const query: PrismaPromise<any> = prisma.user.create({
			data: data
		})
		
		this.requestsStack.push(query)
	}
	
	patch(data: {
		id: string,
		name?: string,
		login?: string,
		password?: string,
	}): void {
		const query: PrismaPromise<any> = prisma.user.update({
			where: {
				id: data.id
			},
			data: data
		})
		
		this.requestsStack.push(query)
	}
	
	delete(data: {
		id: string
	}): void {
		const query = prisma.user.delete({
			where: data
		})
		
		this.requestsStack.push(query)
	}
	
}