
import {Op} from "@benev/frog"
import {GqlCollection, Shopify} from "shopify-shepherd"

import {Route} from "../routing/types.js"
import {load_single_product} from "./load/product.js"
import {Situations} from "../context/types/situations.js"
import {load_product_listing} from "./load/product_listing.js"

type PilotParams = {
	shopify: Shopify
	set_situation_op: Op.Setter<Situations.Whatever>
	home: "all_products" | "collection_list"
	collections_promise: Promise<GqlCollection[]>
}

export class Pilot {
	#params: PilotParams

	constructor(params: PilotParams) {
		this.#params = params
	}

	async load(route: Route) {
		const {shopify, set_situation_op, home, collections_promise} = this.#params
		const page_size = 10
		switch (route.zone) {

			case "catalog":
				return home === "all_products"
					? load_product_listing(
						list => ({...list, type: "all_products"}),
						set_situation_op,
						shopify.products({page_size}),
					)
					: Op.run(
						op => set_situation_op(
							Op.morph(op, collections => ({
								type: "collection_list",
								collections,
							} as Situations.CollectionList))
						),
						async() => collections_promise,
					)

			case "search":
				return load_product_listing(
					list => ({...list, type: "search_results"}),
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
					list => ({
						...list,
						type: "products_in_collection",
						collection_id: route.id,
					}),
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

