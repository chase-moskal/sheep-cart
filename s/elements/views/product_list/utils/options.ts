
import {GqlProduct} from "shopify-shepherd"
import {Situations} from "../../../../context/types/situations.js"

export type Options = {
	situation: Situations.ProductListing
	make_link: (product: GqlProduct) => string
}

