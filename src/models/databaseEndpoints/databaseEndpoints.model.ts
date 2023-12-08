import {PrismaPromise} from "@prisma/client";
import {IDatabaseEndpoints} from "./databaseEndpoints.interface.js";
import prisma from "../helpers/prisma.js";

export class databaseEndpointsModel implements IDatabaseEndpoints {
	constructor() {
		this.requestsStack = []
	}
	
	protected requestsStack: PrismaPromise<any>[];
	
	clearRequests(): void {
		this.requestsStack = []
	}
	
	
	getRequests(): PrismaPromise<any>[] {
		return this.requestsStack
	}
	
	async execute() : Promise<any[]> {
		const data = prisma.$transaction(this.requestsStack)
		this.clearRequests()
		return data
	}
}