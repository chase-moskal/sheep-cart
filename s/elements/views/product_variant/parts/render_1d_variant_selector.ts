
import {html} from "@benev/slate"

import {VariantSelectorOptions} from "./types.js"
import {extract_variant_details} from "./extract_variant_details.js"

export function render_1d_variant_selector({
		cart, product_helper, selected_variant, set_variant
	}: VariantSelectorOptions) {

	function is_selected(id: string) {
		return id === selected_variant.id
	}

	return html`
		<div class="one-d-selector">
			${product_helper.variants.map(v => {
				const {
					img, icon, status
				} = extract_variant_details(v, cart, product_helper)

				return html`
					<div
						part=thumbnail
						class=thumbnail
						@click=${(e: Event) => {
							e.preventDefault()
							set_variant(v)
							}}
						?data-selected=${is_selected(v.id)}
						?data-in-cart=${status === "in cart"}
						?data-sold-out=${status === "sold out"}>
						${!!status ? html`<p class=status>${status}</p>` : undefined}
						<div class=img>
							<img
								alt="${img.altText}"
								src="${img.url_tiny}"/>
							${!!status
									? html`
										<div class=icon>
											${icon}
										</div>
									`
									: undefined
								}
						</div>
						<p>${v.title}</p>
					</div>
				`
			})}
		</div>
	`
}
