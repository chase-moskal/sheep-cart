
import {Paginator} from "./parts/paginator.js"
import {ImageFormat} from "./requests/units/image.js"
import {ShopifyRemote} from "./parts/shopify_remote.js"
import {make_request_for_shop} from "./requests/shop.js"
import {ShopifySettings} from "./utils/shopify_settings.js"
import {default_page_size} from "./utils/default_page_size.js"
import {make_request_for_products} from "./requests/products.js"
import {Collection, Product} from "./parts/types/shepherd_types.js"
import {CountryLibrary} from "./parts/countries/country_library.js"
import {make_request_for_collections} from "./requests/collections.js"

export class ShopifyShepherd {
	#remote: ShopifyRemote

	static make(settings: ShopifySettings) {
		return new this(new ShopifyRemote(settings))
	}

	static async all<T>(generator: AsyncGenerator<T[]>) {
		const all: T[][] = []
		for await (const items of generator)
			all.push(items)
		return all.flat()
	}

	constructor(remote: ShopifyRemote) {
		this.#remote = remote
	}

	async info() {
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

	async *products({
			page_size = default_page_size,
			image_format = "WEBP",
		}: {
			page_size?: number
			image_format?: ImageFormat
		} = {}): AsyncGenerator<Product[]> {

		const paginator = new Paginator<any>(
			async({after}) => (await this.#remote.request(
				make_request_for_products({
					after,
					page_size,
					image_format,
				})
			)).products
		)

		while (paginator.there_are_more_pages) {
			const page = await paginator.next_page()
			const products = Paginator.unwrap(page)
			yield products.map((p: any) => ({
				...p,
				images: Paginator.unwrap(p.images),
				collections: Paginator.unwrap(p.collections),
			}))
		}
	}

	async *collections({
			page_size = default_page_size,
			image_format = "WEBP",
		}: {
			page_size?: number
			image_format?: ImageFormat
		} = {}): AsyncGenerator<Collection[]> {

		const paginator = new Paginator<any>(
			async({after}) => (await this.#remote.request(
				make_request_for_collections({
					after,
					page_size,
					image_format,
				})
			)).collections
		)

		while (paginator.there_are_more_pages) {
			const page = await paginator.next_page()
			const collections = Paginator.unwrap(page)
			yield collections
		}
	}

	async fetch_everything_cool() {
		const [info, products, collections] = await Promise.all([
			this.info(),
			ShopifyShepherd.all(this.products()),
			ShopifyShepherd.all(this.collections()),
		])

		const country_library = new CountryLibrary()
		const countries_with_available_shipping = country_library.query(info.shipsToCountries)

		return {
			info,
			products,
			collections,
			countries_with_available_shipping,
		}
	}
}

