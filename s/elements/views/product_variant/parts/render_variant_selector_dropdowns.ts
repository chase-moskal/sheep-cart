
import {html} from "lit"

import {Choice} from "../../product_focus/parts/types.js"
import {ChoiceHelper} from "../../product_focus/parts/choice_helper.js"
import {ProductHelper} from "../../product_focus/parts/product_helper.js"

interface VariantSelectorOptionsND {
	choices: Choice[]
	product_helper: ProductHelper
	set_choices: (name: string, value: string) => void
}

export function render_variant_selector_dropdowns({
		choices, product_helper, set_choices
	}: VariantSelectorOptionsND) {

	const {product} = product_helper
	const choice_helper = new ChoiceHelper(product_helper, choices)

	function is_selected(name: string, value: string) {
		return value === choice_helper.get_choice(name)
	}

	function handle_input(name: string) {
		return (event: InputEvent) => {
			const target = event.target as HTMLSelectElement
			set_choices(name, target.value)
		}
	}

	return product.options.map(({name, values}) => html`
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
	`)
}
