
import {Op} from "@benev/frog"
import {GqlCollection, GqlProduct} from "shopify-shepherd"

export namespace Situations {

	export type CollectionList = {
		type: "collection_list"
		collections: GqlCollection[]
	}

	export type ProductList = {
		type: "product_list"
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
		| CollectionList
		| ProductList
		| SingleProduct
		| NotFound
	)
}

