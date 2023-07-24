import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'
import StoreProductValidator from 'App/Validators/Products/StoreProductValidator'
import UpdateProductValidator from 'App/Validators/Products/UpdateProductValidator'

export default class ProductsController {
    public async index({ request, response }: HttpContextContract) {
        const page = request.input('page', 1)
        const limit = request.input('max', 10)

        const products = await Database.from('products').paginate(page, limit)

        products.baseUrl('/products')

        return response.ok(products.toJSON())
    }

    public async store({ request, response, bouncer }: HttpContextContract) {
        await bouncer.with('ProductPolicy').authorize('create')

        const payload = await request.validate(StoreProductValidator)
        const product = await Product.create(payload)

        return response.created(product)
    }

    public async show ({ response, params }: HttpContextContract) {
        const product = await Product.findOrFail(params.id)
        return response.ok(product)
    }

    public async update ({ request, response, params, bouncer }: HttpContextContract) {
        const product = await Product.findOrFail(params.id)

        await bouncer.with('ProductPolicy').authorize('update')
        
        const payload = await request.validate(UpdateProductValidator)

        product.merge(payload).save()

        return response.ok(product)
    }

    public async destroy({ response, params, bouncer }: HttpContextContract) {
        const product = await Product.findOrFail(params.id)

        await bouncer.with('ProductPolicy').authorize('delete')

        product.delete()

        return response.ok(product)
    }
}
