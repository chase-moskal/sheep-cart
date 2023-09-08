
import {html} from "lit"

import {VariantSelectorOptionsND} from "./types.js"
import {ChoiceHelper} from "../../product_focus/parts/choice_helper.js"

export function render_variant_selector_dropdowns({
		cart, choices, product_helper, set_choices
	}: VariantSelectorOptionsND) {

	const {product} = product_helper
	const choice_helper = new ChoiceHelper(product_helper, choices)

	const selected_variant = choice_helper.selected_variant

	const cart_units_correspoding_to_product = cart.units
		.filter(unit => unit.product_id === product.id)

	function is_selected(name: string, value: string) {
		return value === choice_helper.get_choice(name)
	}

	function handle_input(name: string) {
		return (event: InputEvent) => {
			const target = event.target as HTMLSelectElement
			set_choices(name, target.value)
		}
	}

	return html`
		<div class=nd-grid>
			<div class=dropdowns>
				${product.options.map(({name, values}) => html`
				<label>
					<span>${name}</span>
					<select @input=${handle_input(name)}>
						${values.map(value => html`
							<option ?selected=${is_selected(name, value)}>
								${value}
							</option>
						`)}
					</select>
				</label>
			`)}
			</div>
			<div class="cart-items">
				<p>in cart:</p>
				${cart_units_correspoding_to_product.map(({variant}) => {
					const img = product_helper.get_variant_image(variant.id) ?? {
						altText: `${variant.title} image`,
						url_tiny: "https://i.imgur.com/h1v2noQ.webp"
					}
					return html`
						<div
							class="item"
							?data-selected=${selected_variant.id === variant.id}>
							<img
								alt="${img.altText}"
								src="${img.url_tiny}"/>
							<p>${variant.title}</p>
						</div>
					`
				})}
			</div>
		</div>
	`
}


