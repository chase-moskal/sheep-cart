
import {Op} from "@benev/frog"
import {GqlCollection, GqlProduct} from "shopify-shepherd"

export namespace Situations {

	export type CollectionListing = {
		type: "collection_listing"
		collections: GqlCollection[]
	}

	export type ProductListing = {
		type: "product_listing"
		products: GqlProduct[]
		load_more: (() => void) | undefined
		load_more_op: Op.For<void>
	}

	export type SingleProduct = {
		type: "single_product"
		product: GqlProduct
	}

	export type NotFound = {
		type: "not_found",
		message?: string
	}

	export type Whatever = (
		| CollectionListing
		| ProductListing
		| SingleProduct
		| NotFound
	)
}

