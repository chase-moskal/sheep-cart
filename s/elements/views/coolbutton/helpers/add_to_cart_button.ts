
import {GqlProduct} from "shopify-shepherd"
import {CoolbuttonParams} from "../view.js"
import {Cart} from "../../../../carting/cart.js"

export function add_to_cart_button(
		cart: Cart,
		variant_id: string,
		product: GqlProduct,
	): CoolbuttonParams {

	const variant = product
		.variants
		.edges
		.map(e => e.node)
		.find(v => v.id === variant_id)!

	const unit = cart
		.units
		.find(u => u.variant_id === variant_id)

	return unit
		? {
			text: "in cart",
			active: false,
			onclick: () => {},
		}
		: variant.availableForSale
			? {
				text: "Add to Cart",
				active: true,
				onclick: event => {
					event.preventDefault()
					cart.add(variant_id, product)
				},
			}
			: {
				text: "Sold Out",
				active: false,
				onclick: () => {},
			}
}

