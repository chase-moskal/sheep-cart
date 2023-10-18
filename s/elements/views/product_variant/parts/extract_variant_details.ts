
import {svg} from "@benev/slate"
import {GqlVariant} from "shopify-shepherd"

import {Cart} from "../../../../carting/cart.js"
import {ProductHelper} from "../../product_focus/parts/product_helper.js"

import icon_x from "../../../../icons/feather/icon_x.js"
import icon_check from "../../../../icons/feather/icon_check.js"

export function extract_variant_details(
		variant: GqlVariant, cart: Cart, product_helper: ProductHelper
	) {

	const img = product_helper.get_variant_image(variant.id) ?? {
		altText: `${variant.title} image`,
		url_tiny: "https://i.imgur.com/h1v2noQ.webp"
	}
	const unit = cart.units
		.find(u => u.variant_id === variant.id)

	const status = unit
		? "in cart"
		: variant.availableForSale
			? ""
			: "sold out"

	const icon = status === "in cart"
		? icon_check(svg)
		: status === "sold out"
			? icon_x(svg)
			: undefined

	return {img, status, icon}
}
