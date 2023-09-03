
import {html, svg} from "lit"
import {GqlVariant} from "shopify-shepherd"

import {Cart} from "../../../../carting/cart.js"
import {ProductHelper} from "../../product_focus/parts/product_helper.js"

import icon_x from "../../../../icons/feather/icon_x.js"
import icon_check from "../../../../icons/feather/icon_check.js"

interface VariantSelectorOptions1D {
	cart: Cart
	selected_variant: GqlVariant
	product_helper: ProductHelper
	set_variant: (variant: GqlVariant) => void
}

export function render_1d_variant_selector({
		cart, product_helper, selected_variant, set_variant
	}: VariantSelectorOptions1D) {

	function is_selected(id: string) {
		return id === selected_variant.id
	}

	return html`
		<div class="one-dimension">
			${product_helper.variants.map(v => {
				const img = product_helper.get_variant_image(v.id) ?? {
					altText: `${v.title} image`,
					url_tiny: "https://i.imgur.com/h1v2noQ.webp"
				}
				const unit = cart.units
					.find(u => u.variant_id === v.id)

				const status = unit
					? "in cart"
					: v.availableForSale
						? ""
						: "sold out"

				const icon = status === "in cart"
					? html`<div class=icon>${icon_check(svg)}</div>`
					: status === "sold out"
						? html`<div class=icon>${icon_x(svg)}</div>`
						: undefined

				return html`
					<div
						@click=${() => set_variant(v)}
						?data-selected=${is_selected(v.id)}
						?data-in-cart=${status === "in cart"}
						?data-sold-out=${status === "sold out"}>
						${!!status ? html`<p class=status>${status}</p>` : undefined}
						<div class=img>
							<img
								alt="${img.altText}"
								src="${img.url_tiny}"/>
							${icon}
						</div>
						<p>${v.title}</p>
					</div>
				`
			})}
		</div>
	`
}
