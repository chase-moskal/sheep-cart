
import {gql} from "./parts/graphql.js"
import {Paginator} from "./parts/paginator.js"
import {ImageFormat} from "./requests/units/image.js"
import {ShopifyRemote} from "./parts/shopify_remote.js"
import {ShopifySettings} from "./utils/shopify_settings.js"
import {make_request_for_products} from "./requests/products.js"

export class ShopifyShepherd {
	#remote: ShopifyRemote

	static make(settings: ShopifySettings) {
		return new this(new ShopifyRemote(settings))
	}

	constructor(remote: ShopifyRemote) {
		this.#remote = remote
	}

	async fetch_shop() {
		return this.#remote.request({
			query: gql`
				{
					shop {
						name
					}
				}
			`
		})
	}

	async fetch_products(page_size: number, image_format: ImageFormat = "WEBP") {
		return new Paginator<any>(
			async({after}) => this.#remote.request(make_request_for_products({
				after,
				page_size,
				image_format,
			}))
		)
	}

	async *products(page_size: number, image_format: ImageFormat = "WEBP") {
		const paginator = new Paginator<any>(
			async({after}) => {
				const data = await this.#remote.request(make_request_for_products({
					after,
					page_size,
					image_format,
				}))
				return {
					objective: data.products.edges,
					pageInfo: data.products.pageInfo,
				}
			}
		)
		while (paginator.there_are_more_pages)
			yield await paginator.next_page()
	}
}

