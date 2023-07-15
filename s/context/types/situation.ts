
import {GqlProduct} from "shopify-shepherd"

export type ProductListingSituation = {
	type: "ProductListing"
	products: GqlProduct[]
	load_more: undefined | (() => void)
}

export type ProductFocusSituation = {
	type: "ProductFocus"
	product: GqlProduct
}

export type NotFoundSituation = {
	type: "NotFound"
}

export type Situation = (
	| undefined
	| ProductListingSituation
	| ProductFocusSituation
	| NotFoundSituation
)

