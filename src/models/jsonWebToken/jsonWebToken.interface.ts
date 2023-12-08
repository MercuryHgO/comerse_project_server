import {SignOptions} from "jsonwebtoken";

export interface IJWT {
	destroy(token: string, destroyAt: Date): void
	
	sign(
		payload: any,
		key: string,
		opts: SignOptions
	): string
	
	verify(
		token: string,
		key: string
	): any
}