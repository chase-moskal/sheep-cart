
import {html, svg} from "lit"

import {Cart} from "../../../../carting/cart.js"
import {ChoiceHelper} from "../../product_focus/parts/choice_helper.js"

import icon_x from "../../../../icons/feather/icon_x.js"
import icon_check from "../../../../icons/feather/icon_check.js"

export function render_one_dimension(
		choiceHelper: ChoiceHelper,
		set_choice: (name: string, value: string) => void,
		cart: Cart
	) {

	const {productHelper} = choiceHelper

	function is_selected(name: string, value: string) {
		return value === choiceHelper.get_choice(name)
	}

	return html`
		<div class="one-dimension">
			${productHelper.variants.map(v => {
				const img = productHelper.get_variant_image(v.id) ?? {
					altText: `${v.title} image`,
					url_tiny: "https://i.imgur.com/h1v2noQ.webp"
				}
				const [{name, value}] = v.selectedOptions
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
						@click=${() => set_choice(name, value)}
						?data-selected=${is_selected(name, value)}
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
