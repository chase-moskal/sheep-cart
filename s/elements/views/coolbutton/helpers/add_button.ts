
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"

import {Cart} from "../../../../carting/cart.js"
import {Context} from "../../../../context/context.js"

export type CardAddParams = {
	cart: Cart
	variant_id: string
	product: GqlProduct
	allow_select: boolean
	Coolbutton: Context["views"]["Coolbutton"]
}

export function add_button({
		cart,
		product,
		variant_id,
		allow_select,
		Coolbutton,
	}: CardAddParams) {

	type ButtonType = (
		| "select_from_variants"
		| "in_cart"
		| "add_to_cart"
		| "sold_out"
	)

	const number_of_variants = product
		.variants
		.edges
		.length

	const variant = product
		.variants
		.edges
		.map(e => e.node)
		.find(v => v.id === variant_id)!

	const unit = cart
		.units
		.find(u => u.variant_id === variant_id)

	const button_type: ButtonType = (allow_select && number_of_variants > 1)
		? "select_from_variants"
		: unit
			? "in_cart"
			: variant.availableForSale
				? "add_to_cart"
				: "sold_out"

	switch (button_type) {
		case "select_from_variants":
			return Coolbutton({
				class: "button x-select-from-variants",
			})({
				active: true,
				onclick: () => {},
			})(html`
				${number_of_variants} Options
			`)

		case "in_cart":
			return Coolbutton({
				class: "button x-in-cart",
			})({
				active: false,
				onclick: () => {},
			})(html`
				in cart
			`)

		case "add_to_cart":
			return Coolbutton({
				class: "button x-add-to-cart",
			})({
				active: true,
				onclick: event => {
					event.preventDefault()
					cart.add(variant_id, product)
				},
			})(html`
				Add to Cart
			`)

		case "sold_out":
			return Coolbutton({
				class: "button x-sold-out",
			})({
				active: false,
				onclick: () => {},
			})(html`
				Sold Out
			`)

		default:
			throw new Error(`unknown button type "${button_type}"`)
	}
}

export const addbutton_states = `
	x-add-to-cart,
	x-select-from-variants,
	x-in-cart,
	x-sold-out,
`

