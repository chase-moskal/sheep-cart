
import {Shopify} from "shopify-shepherd"

import {LoaderParams} from "./types.js"
import {Context} from "../components/context.js"
import {product_listing} from "./utils/product_listing.js"
import { load_product } from "./load/product.js"

export class Pilot {
	constructor(
		public readonly shopify: Shopify,
		public readonly context: Context,
	) {}

	async load() {
		const {shopify, context} = this
		const route = context.route.value
		context.situation.value = undefined
		const page_size = 10
		const params: LoaderParams = {shopify, context, page_size: 10}

		switch (route.zone) {

			case "catalog":
				return product_listing(context, shopify.products({page_size}))

			case "search":
				return product_listing(context, shopify.products({
					page_size,
					query: {
						tags: route.tags,
						terms: route.terms,
					},
				}))

			case "collection":
				return product_listing(context, shopify.products_in_collection({
					page_size,
					collection_id: route.id,
				}))

			case "product":
				return load_product(route, params)

			case "not_found": {
			} break
		}
	}
}

