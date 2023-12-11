import {IJWT} from "./jsonWebToken.interface.js";
import {JwtPayload, SignOptions} from "jsonwebtoken";
import pkg from "jsonwebtoken"
const {sign, verify} = pkg
import prisma from "../helpers/prisma.js";

export class JWTModel implements IJWT {
	async destroy(token: string, destroyAt: Date): Promise<void> {
		await prisma.destoryedTokens.create({
			data: {
				token: token,
				destroyAt: destroyAt
			}
		})
	}
	
	sign(payload: any, key: string, opts: SignOptions): string {
		return sign(payload, key, opts);
	}
	
	async verify(token: string, key: string): Promise<any> {
		let decodedInfo: string | JwtPayload;
		
		if (!token) throw new Error("NO_TOKEN")
		
		const tokenIsDestroyed = await prisma.destoryedTokens.findUnique({
			where: {
				token: token
			}
		})
		
		if (!!tokenIsDestroyed) throw new Error('TOKEN_DESTROYED')
		
		verify(token, key, (error, decoded) => {
			if (error) {
				throw new Error("TOKEN_INVALID")
			}
			if (decoded) decodedInfo = decoded
		})
		
		return decodedInfo
	}
	
}
