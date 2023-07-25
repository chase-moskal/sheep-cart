
import {TemplateResult} from "lit"
import {GqlProduct, GqlVariant} from "shopify-shepherd"

export function display_price({
		product,
		single_price,
		multiple_prices,
	}: {
		product: GqlProduct
		single_price: (price: string) => TemplateResult
		multiple_prices: (price: string) => TemplateResult
	}) {

	const more_than_one_variant = product.variants.edges.length > 1

	const all_the_same_price = product.variants.edges
		.every(p => p.node.price.amount === product.variants.edges[0].node.price.amount)

	function price_for({node: variant}: {node: GqlVariant}) {
		return parseFloat(variant.price.amount)
	}

	const lowest_price = product.variants.edges.reduce(
		(previous, current) => (price_for(current) < previous)
			? price_for(current)
			: previous,
		price_for(product.variants.edges[0])
	)

	const formatted_price = lowest_price.toFixed(2)

	return (more_than_one_variant && !all_the_same_price)
		? multiple_prices(formatted_price)
		: single_price(formatted_price)
}

