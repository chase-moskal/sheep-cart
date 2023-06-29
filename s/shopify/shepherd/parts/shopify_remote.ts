
import {ShopifySettings} from "../utils/shopify_settings.js"

export class ShopifyRemote {
	#settings: ShopifySettings

	constructor(settings: ShopifySettings) {
		this.#settings = settings
	}

	async request({query, variables}: {
			query: string
			variables?: {[key: string]: any}
		}) {

		const {domain, storefront_access_token, api_version} = this.#settings

		const url = `https://${domain}/api/${api_version}/graphql`
		const method = "POST"

		const headers = {
			"Content-Type": "application/json",
			"X-Shopify-Storefront-Access-Token": storefront_access_token,
		}

		const request = variables
			? {query, variables}
			: {query}

		const response = await fetch(url, {
			method,
			headers,
			mode: "cors",
			body: JSON.stringify(request),
		})

		return response.json()
	}
}

