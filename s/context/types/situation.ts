
import {Op} from "../utils/op"
import {GqlProduct} from "shopify-shepherd"

export type ProductListingSituation = {
	type: "ProductListing"
	products: GqlProduct[]
	load_more: undefined | (() => void)
	load_more_op: Op.Operation<void>
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

