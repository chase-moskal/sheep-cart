
import {CartUnit} from "../../../carting/parts/types.js"
import {VariantPricing} from "../../views/price/parts/types.js"

export function sum_subtotal([first, ...units]: CartUnit[]): VariantPricing {
	const currencyCode = first.variant.price.currencyCode
	const first_value = parseFloat(first.variant.price.amount)

	const totals = {
		price: first_value,
		compared: first.variant.compareAtPrice
			? parseFloat(first.variant.compareAtPrice.amount)
			: first_value
	}

	for (const {variant} of units) {
		const value = parseFloat(variant.price.amount)
		totals.price += value
		totals.compared += variant.compareAtPrice
			? parseFloat(variant.compareAtPrice.amount)
			: value
	}

	return {
		price: {
			currencyCode,
			amount: totals.price.toString(),
		},
		compareAtPrice: (totals.price !== totals.compared)
			? {
				currencyCode,
				amount: totals.compared.toString(),
			}
			: undefined,
	}
}

