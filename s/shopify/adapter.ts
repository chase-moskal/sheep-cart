
import ShopifyBuy from "shopify-buy"

export type AdapterOptions = {
	domain: ShopifyBuy.Config["domain"]
	storefrontAccessToken: ShopifyBuy.Config["storefrontAccessToken"]
}

export const apiVersion = "2023-04"

export class ShopifyAdapter {
	#client: ShopifyBuy

	constructor({domain, storefrontAccessToken}: AdapterOptions) {
		this.#client = ShopifyBuy.buildClient({
			domain,
			apiVersion,
			storefrontAccessToken,
		})
	}
}

