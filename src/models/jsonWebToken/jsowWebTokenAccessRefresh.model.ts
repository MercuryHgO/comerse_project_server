import { IJWTAccessRefresh} from "./jsonWebTokenAccessRefresh.interface.js";
import {SignOptions} from "jsonwebtoken";
import {JWTModel} from "./jsonWebToken.model.js";

export class UserJWTModel extends JWTModel implements IJWTAccessRefresh {
	
	// signers
	signAccess(data: {}, opt: SignOptions): string {
		return this.sign(data,process.env.JWT_ACCESS_KEY,opt)
	}
	
	signRefresh(accessToken: string, opt: SignOptions): string {
		return this.sign({access: accessToken},process.env.JWT_REFRESH_KEY,opt)
	}
	
	// verifiers
	async verifyAccess(token: string): Promise<any> {
		return await this.verify(token, process.env.JWT_ACCESS_KEY)
	}
	
	async verifyRefresh(token: string): Promise<{ access: string }> {
		return await this.verify(token, process.env.JWT_REFRESH_KEY)
	}
	
}

export class AdminJWTModel extends JWTModel implements IJWTAccessRefresh{
	// signers
	signAccess(data: {}, opt: SignOptions): string {
		return this.sign(data,process.env.JWT_ADMIN_ACCESS_KEY,opt)
	}
	
	signRefresh(accessToken: string, opt: SignOptions): string {
		return this.sign({access: accessToken},process.env.JWT_ADMIN_REFRESH_KEY,opt)
	}
	
	// verifiers
	async verifyAccess(token: string): Promise<any> {
		return await this.verify(token, process.env.JWT_ADMIN_ACCESS_KEY)
	}
	
	async verifyRefresh(token: string): Promise<{ access: string }> {
		return await this.verify(token, process.env.JWT_ADMIN_REFRESH_KEY)
	}
	
}