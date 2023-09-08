
import {GqlVariant} from "shopify-shepherd"
import {Choice} from "../../product_focus/parts/types.js"
import {Cart} from "../../../../carting/cart.js"
import {ProductHelper} from "../../product_focus/parts/product_helper.js"

export namespace VariantGridSituation {
	export type Kind = "1-dimensional" | "2-dimensional" | "n-dimensional"

	export interface Base {
		kind: Kind
	}

	export interface OneDimensional extends Base {
		kind: "1-dimensional"
		variant: GqlVariant
	}

	export interface TwoDimensional extends Base {
		kind: "2-dimensional"
		variant: GqlVariant
	}

	export interface NDimensional extends Base {
		kind: "n-dimensional"
		choices: Choice[]
	}

	export type Whatever = OneDimensional | TwoDimensional | NDimensional
}


export interface VariantSelectorOptions {
	cart: Cart
	selected_variant: GqlVariant
	product_helper: ProductHelper
	set_variant: (variant: GqlVariant) => void
}

export interface VariantSelectorOptionsND {
	cart: Cart
	choices: Choice[]
	product_helper: ProductHelper
	set_choices: (name: string, value: string) => void
}
