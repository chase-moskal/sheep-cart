
import {Op} from "@benev/frog"
import {Shopify} from "shopify-shepherd"

import {Route} from "../routing/types.js"
import {load_single_product} from "./load/product.js"
import {Situations} from "../context/types/situations.js"
import {load_product_listing} from "./load/product_listing.js"

type PilotParams = {
	shopify: Shopify
	set_situation_op: Op.Setter<Situations.Whatever>
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
					set_situation_op,
					shopify.product({id: route.id}),
				)

			case "not_found":
				return set_situation_op(
					Op.ready({type: "not_found"})
				)
		}
	}
}

