
import {Paginator} from "./parts/paginator.js"
import {ImageFormat} from "./requests/units/image.js"
import {Product} from "./parts/types/shepherd_types.js"
import {ShopifyRemote} from "./parts/shopify_remote.js"
import {make_request_for_shop} from "./requests/shop.js"
import {ShopifySettings} from "./utils/shopify_settings.js"
import {unwrap_gql_edges} from "./utils/unwrap_gql_edges.js"
import {default_page_size} from "./utils/default_page_size.js"
import {make_request_for_products} from "./requests/products.js"

export class ShopifyShepherd {
	#remote: ShopifyRemote

	static make(settings: ShopifySettings) {
		return new this(new ShopifyRemote(settings))
	}

	constructor(remote: ShopifyRemote) {
		this.#remote = remote
	}

	async fetch_shop_info() {
		const result = await this.#remote.request(make_request_for_shop())

		return result.shop as {
			name: string
			description?: string
			shipsToCountries: string[]
			paymentSettings: {
				currencyCode: string
				countryCode: string
			}
		}
	}

	async *fetch_products({
			page_size = default_page_size,
			image_format = "WEBP",
		}: {
			page_size?: number,
			image_format?: ImageFormat,
		} = {}): AsyncGenerator<Product[]> {

		const paginator = new Paginator<any>(
			async({after}) => {
				const data = await this.#remote.request(make_request_for_products({
					after,
					page_size,
					image_format,
				}))
				return {
					objective: data.products,
					pageInfo: data.products.pageInfo,
				}
			}
		)

		while (paginator.there_are_more_pages) {
			const page = await paginator.next_page()
			const products = unwrap_gql_edges(page)
			yield products.map((p: any) => ({
				...p,
				collections: unwrap_gql_edges(p.collections),
				images: unwrap_gql_edges(p.images),
			}))
		}
	}

	async fetch_all_products({image_format = "WEBP"}: {
			image_format?: ImageFormat,
		} = {}) {

		const everything: Product[][] = []

		for await (const products of this.fetch_products({image_format}))
			everything.push(products)

		return everything.flat()
	}
}

