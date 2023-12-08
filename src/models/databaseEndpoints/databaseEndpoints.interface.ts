import { PrismaPromise } from "@prisma/client"
import {IJWTAccessRefresh} from "../jsonWebToken/jsonWebTokenAccessRefresh.interface.js";

export interface IDatabaseEndpoints {
	/**
	 * Return requests stack
	 */
	getRequests(): PrismaPromise<any>[]
	/**
	 * Clears requests stack
	 */
	clearRequests(): void
	
	/**
	 * Executes all requests from stack
	 */
	execute(): Promise<any[]>
	
}
