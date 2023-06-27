
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

export class ShopifyAdapter2 {
	#settings: AdapterOptions

	async #request(query: string) {
		const {domain, storefrontAccessToken} = this.#settings
		const url = `https://${domain}/api/${apiVersion}/graphql`
		const method = "POST"
		const headers = {
			"Content-Type": "application/json",
			// "X-Sdk-Variant": "javascript",
			// "X-Sdk-Version": "2.19.0",
			"X-Shopify-Storefront-Access-Token": storefrontAccessToken,
		}
		const response = await fetch(url, {
			method,
			mode: "cors",
			headers,
			body: `{"query":"query { shop { id,paymentSettings { enabledPresentmentCurrencies },description,moneyFormat,name,primaryDomain { host,sslEnabled,url } } }"}`,
		})
		return response.json()
	}

	constructor(settings: AdapterOptions) {
		this.#settings = settings
	}

	async fetch_store_info() {
		return this.#request(`
			{
				shop {
					name
				}
			}
		`)
	}
}

