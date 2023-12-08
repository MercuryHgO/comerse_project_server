import {SignOptions} from "jsonwebtoken";
import {IJWT} from "./jsonWebToken.interface.js";

export interface IJWTAccessRefresh extends IJWT {
	signAccess(data: {}, opt: SignOptions): string
	signRefresh(accessToken: string, opt: SignOptions): string
	
	verifyAccess(token: string): Promise<any>
	verifyRefresh(token: string): Promise<{ access: string}>
}