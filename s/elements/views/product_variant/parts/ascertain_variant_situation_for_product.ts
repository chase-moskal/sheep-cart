
import {GqlProduct} from "shopify-shepherd"

import {VariantGridSituation} from "./types.js"
import {ProductHelper} from "../../product_focus/parts/product_helper.js"

export function ascertain_variant_situation_for_product(product: GqlProduct, product_helper: ProductHelper) {
	
	if (product.options.length === 1) {
		return {
			situation: {
				kind: "1-dimensional",
				variant: product_helper.first_variant,
			} as VariantGridSituation.OneDimensional
		}
	}

	else if (product.options.length === 2) {
		return {
			situation: {
				kind: "2-dimensional",
				variant: product_helper.first_variant,
			} as VariantGridSituation.TwoDimensional
		}
	}

	else if (product.options.length > 2) {
		return {
			situation: {
				kind: "n-dimensional",
				choices: product_helper.first_variant.selectedOptions,
			} as VariantGridSituation.NDimensional
		}
	}

	else {
		return{}
	}
}
