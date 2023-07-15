import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import StoreProductValidator from 'App/Validators/Products/StoreProductValidator'
import UpdateProductValidator from 'App/Validators/Products/UpdateProductValidator'

export default class ProductsController {
    public async index({ response }: HttpContextContract) {
        const products = await Product.all()
        return response.ok(products)
    }

    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(StoreProductValidator)
        const product = await Product.create(payload)

        return response.created(product)
    }

    public async show ({ response, params }: HttpContextContract) {
        const product = await Product.findOrFail(params.id)
        return response.ok(product)
    }

    public async update ({ request, response, params }: HttpContextContract) {
        const product = await Product.findOrFail(params.id)
        const payload = await request.validate(UpdateProductValidator)

        product.merge(payload).save()

        return response.ok(product)
    }

    public async destroy({ response, params }: HttpContextContract) {
        const product = await Product.findOrFail(params.id)
        product.delete()
        return response.ok(product)
    }
}
