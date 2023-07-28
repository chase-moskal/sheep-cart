
import {Flat, Op} from "@benev/frog"
import {GqlProduct, Shopify} from "shopify-shepherd"

export type CartState = ReturnType<typeof Cart.init_state>

export type CartItem = {
	product_id: string
	variant_id: string
	quantity: number
}

export type ProductCache = {
	product_id: string
	op: Op.For<GqlProduct>
}

export class Cart {
	static init_state = () => ({
		items: [] as CartItem[],
		products: [] as ProductCache[],
	})

	#flat: Flat
	#shopify: Shopify
	#state: CartState
	readonly state: CartState

	constructor(flat: Flat, shopify: Shopify) {
		this.#flat = flat
		this.#shopify = shopify
		this.#state = flat.state(Cart.init_state())
		this.state = Flat.readonly(this.#state)
	}

	#get_item(variant_id: string) {
		return this.#state.items.find(i => i.variant_id === variant_id)
	}

	#get_product(product_id: string) {
		return this.#state.products.find(i => i.product_id === product_id)
	}

	add(product_id: string, variant_id: string, product: GqlProduct) {

		// add item
		this.#state.items = [
			...this.#state.items.filter(i => i.variant_id !== variant_id),
			this.#flat.state({
				product_id,
				variant_id,
				quantity: 1,
			}),
		]

		// add product in ready state
		this.#state.products = [
			...this.#state.products.filter(p => p.product_id !== product.id),
			this.#flat.state({
				product_id: product.id,
				op: Op.ready(product),
			}),
		]
	}

	set_quantity(product_id: string, variant_id: string, quantity: number) {
		const item = this.#get_item(variant_id)!
		item.quantity = quantity
	}

	async load(items: CartItem[]) {
		const not_already_loading = items
			.filter(i => !this.#get_product(i.product_id))
			.map(i => i.product_id)

		const new_caches: ProductCache[] = not_already_loading.map(product_id => this.#flat.state({product_id, op: Op.loading()}))
		this.#state.products = [
			...this.#state.products,
			...new_caches
		]

		const products = await this.#shopify.specific_products({ids: not_already_loading})

		for (const cache of new_caches) {
			const product = products.find(p => p.id === cache.product_id)
			cache.op = product
				? Op.ready(product)
				: Op.error("error retrieving product")
		}
	}
}

