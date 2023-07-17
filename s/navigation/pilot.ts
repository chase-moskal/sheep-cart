
import {Shopify} from "shopify-shepherd"

import {Op} from "../context/utils/op.js"
import {Route} from "../routing/types.js"
import {load_single_product} from "./load/product.js"
import {Situation} from "../context/types/situation.js"
import {load_product_listing} from "./load/product_listing.js"

type PilotParams = {
	shopify: Shopify
	set_situation_op: Op.Setter<Situation>
}

export class Pilot {
	#params: PilotParams

	constructor(params: PilotParams) {
		this.#params = params
	}

	async load(route: Route) {
		const {shopify, set_situation_op} = this.#params
		const page_size = 10
		switch (route.zone) {

			case "catalog":
				return load_product_listing(
					set_situation_op,
					shopify.products({page_size}),
				)

			case "search":
				return load_product_listing(
					set_situation_op,
					shopify.products({
						page_size,
						query: {
							tags: route.tags,
							terms: route.terms,
						},
					})
				)

			case "collection":
				return load_product_listing(
					set_situation_op,
					shopify.products_in_collection({
						page_size,
						collection_id: route.id,
					})
				)

			case "product":
				return load_single_product(
					route,
					shopify,
					set_situation_op,
				)

			case "not_found":
				return set_situation_op(
					new Op.Ready({
						type: "NotFound"
					})
				)
		}
	}
}

