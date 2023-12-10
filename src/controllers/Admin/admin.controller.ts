import {AdminModel} from "../../models/user/admin.model.js";
import sha256 from "sha256";
import {Admin as AdminDatabaseType} from "@prisma/client";


export class AdminController {
	private AdminModel: AdminModel = new AdminModel()
	
	async registerAdmin(data: {login: string, password: string}) : Promise<void> {
		data.password = sha256(data.password)
		
		this.AdminModel.post(data)
		
		await this.AdminModel.execute()
	}
	
	async authorizeAdmin(data: {login: string, password: string}): Promise<{access: string, refresh: string}> {
		data.password = sha256(data.password)
		
		this.AdminModel.get(data)
		
		const result = await this.AdminModel.execute()
		
		if(!result[0][0]) throw new Error("ADMIN_CREDENTIAL_AUTHENTICATION_ERROR")
		
		const access = this.AdminModel.getAuthorizationMethods().signAccess({id: result[0][0]}, { expiresIn: 60*30})
		const refresh = this.AdminModel.getAuthorizationMethods().signRefresh(access,{ expiresIn: "1d"})
		
		return {access, refresh}
	}
	
	async authorizeAdminByAccess(accessToken: string): Promise<AdminDatabaseType> {
		return await this.AdminModel.getAuthorizationMethods().verifyAccess(accessToken)
	}
	
	async updateTokens(refreshToken: string): Promise<{access: string, refresh: string}> {
		const accessToken = await this.AdminModel.getAuthorizationMethods().verifyRefresh(refreshToken)
		const data = await this.AdminModel.getAuthorizationMethods().verifyAccess(accessToken.access)
		
		await this.AdminModel.getAuthorizationMethods().destroy(accessToken.access,new Date(Date.now() + 1000*60*30))
		await this.AdminModel.getAuthorizationMethods().destroy(refreshToken,new Date(Date.now() + 1000*60*60*24))
		
		const newAccess: string = this.AdminModel.getAuthorizationMethods().signAccess(data,{})
		const newRefresh: string = this.AdminModel.getAuthorizationMethods().signRefresh(refreshToken,{ expiresIn: "30d"})
		
		return {access: newAccess, refresh: newRefresh}
	}
}