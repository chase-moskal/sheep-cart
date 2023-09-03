
import {GqlVariant} from "shopify-shepherd"
import {Choice} from "../../product_focus/parts/types.js"

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
