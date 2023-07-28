
import {TemplateResult} from "lit"
import {GqlPrice, GqlProduct} from "shopify-shepherd"

export function display_price({
		product,
		single_price,
		multiple_prices,
	}: {
		product: GqlProduct
		single_price: (price: GqlPrice) => TemplateResult
		multiple_prices: (price: GqlPrice) => TemplateResult
	}) {

	const more_than_one_variant = product.variants.edges.length > 1

	const all_the_same_price = product.variants.edges
		.every(p => p.node.price.amount === product.variants.edges[0].node.price.amount)

	function numerical(price: GqlPrice) {
		return parseFloat(price.amount)
	}

	const prices = product.variants.edges.map(e => e.node.price)

	let lowest_price: GqlPrice = prices[0]

	for (const price of prices) {
		if (numerical(price) < numerical(lowest_price))
			lowest_price = price
	}

	return (more_than_one_variant && !all_the_same_price)
		? multiple_prices(lowest_price)
		: single_price(lowest_price)
}

