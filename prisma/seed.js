import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const LOGIN = process.env.ADMIN_LOGIN
const PASSWORD = process.env.ADMIN_PASSWORD

if (!LOGIN) throw new Error('No admin login found in environment variables')
if (!PASSWORD) throw new Error('No admin password found in environment variables')

prisma.admin.upsert({
	where: {
		id: '0'
	},
	create: {
		id: '0',
		password: PASSWORD,
		login: LOGIN
	},
	update: {
		id: '0',
		password: PASSWORD,
		login: LOGIN
	}
}).then(
	e => {
		console.log('Admin updated:')
		console.log(e)
	}
).catch(
	e => {
		throw new Error(e)
	}
)