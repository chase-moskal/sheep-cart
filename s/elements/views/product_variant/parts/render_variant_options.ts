
import {html} from "lit"

import {render_one_dimension} from "./render_one_dimension.js"
import {render_three_dimensions} from "./render_three_dimension.js"
import {ChoiceHelper} from "../../product_focus/parts/choice_helper.js"

export function render_variant_options(
		choiceHelper: ChoiceHelper,
		set_choice: (name: string, value: string) => void,
	) {

	const {productHelper} = choiceHelper
	const {product} = productHelper

	return html`
		${product.options.length === 1
			? render_one_dimension(choiceHelper, set_choice)
			: product.options.length === 2
				? render_three_dimensions(choiceHelper, set_choice)
				: render_three_dimensions(choiceHelper, set_choice)
		}
	`
}

