
import {ShopifyRemote} from "./parts/shopify_remote.js"
import {ShopifySettings} from "./utils/shopify_settings.js"
import {make_request_for_products} from "./requests/products.js"

export class ShopifyPal {
	#remote: ShopifyRemote

	constructor(settings: ShopifySettings) {
		this.#remote = new ShopifyRemote(settings)
	}

	async fetch_products(page_size: number) {
		let endCursor: string | undefined

		const next_page = async() => {
			const response = await this.#remote.request(
				make_request_for_products(
					endCursor
						? {page_size}
						: {page_size, after: endCursor}
				)
			)

			debugger
			const {pageInfo, edges: products} = response

			if (pageInfo.hasNextPage) {
				endCursor = pageInfo.endCursor
				return {
					products,
					next_page,
				}
			}
			else {
				return {
					products,
					next_page: undefined,
				}
			}
		}

		return next_page()
	}
}

