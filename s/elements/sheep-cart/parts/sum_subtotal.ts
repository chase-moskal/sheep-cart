
import {GqlPrice} from "shopify-shepherd"
import {CartUnit} from "../../../carting/parts/types.js"

export function sum_subtotal([first, ...units]: CartUnit[]): GqlPrice {

	let price = parseFloat(first.variant.price.amount)

	for (const unit of units)
		price += parseFloat(unit.variant.price.amount)

	return {
		amount: price.toString(),
		currencyCode: first.variant.price.currencyCode,
	}
}

