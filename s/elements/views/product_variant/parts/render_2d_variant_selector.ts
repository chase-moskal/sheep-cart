
import {html} from "lit"

import {VariantSelectorOptions} from "./types.js"
import {extract_variant_details} from "./extract_variant_details.js"

export function render_2d_variant_selector({
		cart, set_variant, product_helper, selected_variant
	}: VariantSelectorOptions) {

	const {product} = product_helper

	const first_option = product.options[0]
	const values_for_first_option = first_option.values
	const values_for_second_option = product.options[1].values
	const option_names = product.options.map(product => product.name)

	const variant_grid = first_option.values.map(value => ({
		value,
		variants: product_helper.variants.filter(v => v.title.includes(value))
	}))

	function is_selected(id: string) {
		return id === selected_variant.id
	}

	return html`
		<div class="two-d-selector">
			<div class=option-names>
				${option_names.map(name => html`<p>${name}</p>`)}
			</div>
			<div class="values-one">
				${values_for_first_option.map(value => (
					html`<p>${value}</p>`
				))}
			</div>
			<div class="values-two">
				${values_for_second_option.map(value => (
					html`<p>${value}</p>`
				))}
			</div>
			<div class="thumbnail-grid">
				${variant_grid.map(row => (
					html`
						<div class=row>
							${row.variants.map(v => {
								const {
									img, icon, status
								} = extract_variant_details(v, cart, product_helper)

								return html`
									<div
										part=thumbnail
										class=thumbnail
										@click=${() => set_variant(v)}
										?data-selected=${is_selected(v.id)}
										?data-in-cart=${status === "in cart"}
										?data-sold-out=${status === "sold out"}>
										<div class=img>
											<img
												alt="${img.altText}"
												src="${img.url_tiny}"/>
											${!!status
													? html`
														<div class=icon>
															<p class=status>${status}</p>
															${icon}
														</div>
													`
													: undefined
												}
										</div>
									</div>
								`
							})}
						</div>
					`
				))}
			</div>
		</div>
	`
}
