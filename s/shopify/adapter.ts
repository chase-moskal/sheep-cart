
import Shopify from "shopify-buy/index.es.js"

export type AdapterOptions = {
	domain: string
	storefrontAccessToken: string
}

export const apiVersion = "2023-04"

export class ShopifyAdapter {
	#client: any

	constructor({domain, storefrontAccessToken}: AdapterOptions) {
		this.#client = Shopify.buildClient({
			domain,
			apiVersion,
			storefrontAccessToken,
		})
	}

	async fetch_store_info() {
		return this.#client.shop.fetchInfo()
	}

	async fetch_all() {
		const products = await this.#client.product.fetchAll()
		console.log(products)
		return products
	}
}

