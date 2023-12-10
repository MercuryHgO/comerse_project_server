import UserModel from "../../models/user/user.model.js";
import sha256 from "sha256";
import {User as UserDatabaseType} from "@prisma/client"

// TODO docs

export class AdminController {
	private UserModel = new UserModel()
	
	async registerUser(data: { name: string, login: string, password: string }) {
		data.password = sha256(data.password)
		
		this.UserModel.post(data)
		
		const info = await this.UserModel.execute()
	}
	
	async authorizeUser(login: string, password: string): Promise<{ access: string, refresh: string }> {
		const encryptedPassword = sha256(password)
		
		this.UserModel.get({
			login: login,
			password: encryptedPassword
		})
		
		const data = await this.UserModel.execute()
		
		if (!data[0][0]) throw new Error('USER_CREDENTIAL_AUTHENTICATION_ERROR')
		
		const access = this.UserModel.getAuthorizationMethods().signAccess(data[0][0], {expiresIn: "12h"})
		const refresh = this.UserModel.getAuthorizationMethods().signRefresh(access, {expiresIn: "30d"})
		
		return {access, refresh}
	}
	
	async authorizeUserByAccess(accessToken: string): Promise<UserDatabaseType> {
		return this.UserModel.getAuthorizationMethods().verifyAccess(accessToken)
	}
	
	async updateTokens(refreshToken: string): Promise<{ access: string, refresh: string }> {
		const accessToken = await this.UserModel.getAuthorizationMethods().verifyRefresh(refreshToken)
		const data: UserDatabaseType = await this.UserModel.getAuthorizationMethods().verifyAccess(accessToken.access)
		
		this.UserModel.getAuthorizationMethods().destroy(accessToken.access, new Date(Date.now() + 1000 * 60 * 60 * 12))
		this.UserModel.getAuthorizationMethods().destroy(refreshToken, new Date(Date.now() + 1000 * 60 * 60 * 24 * 30))
		
		const newAccess = this.UserModel.getAuthorizationMethods().signAccess(data,{})
		const newRefresh = this.UserModel.getAuthorizationMethods().signRefresh(newAccess, {expiresIn: "30d"})
		
		return {access: newAccess, refresh: newRefresh}
	}
}