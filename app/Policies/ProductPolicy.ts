import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Roles from 'App/Enums/Roles'

export default class ProductPolicy extends BasePolicy {
	public async create(user: User) {
		return user.role >= Roles.VINER
	}
	public async update(user: User) {
		return user.role >= Roles.VINER
	}
	public async delete(user: User) {
		return user.role >= Roles.ADMINISTRATOR
	}
}
